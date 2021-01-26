import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
import { css } from 'linaria'

import { EmptyState } from './EmptyStates/EmptyState'

import { cls, sortByKey } from '../lib/utils'

const CardTableCss = css`
  display: flex;
  flex-direction: column;

  .CardTable-List {
    border-collapse: collapse;
    border-radius: var(--radius-md);
    box-shadow: var(--box-shadow-lg);
    display: block;
    font-size: 0.9rem;
    margin: 2rem auto 0;
    min-width: 10rem;
    overflow: auto;
    max-width: calc(100vw - 22rem);

    thead tr {
      background-color: var(--clr-blue);
      color: #ffffff;
      text-align: left;
    }

    th,
    td {
      cursor: pointer;
      min-width: 3rem;
      overflow: auto;
      padding: 12px 15px;
      white-space: pre;

      &:focus {
        cursor: unset;
      }

      &.activeCell {
        padding: 7px 9px;

        input {
          font-size: 0.9rem;
          padding: 3px 4px;
          width: 100%;
        }
      }
    }

    tr {
      color: var(--clr-black-70);
    }

    tbody {
      overflow-y: auto;
    }

    tbody tr {
      background-color: #ffffff;
    }

    tbody tr:nth-of-type(even) {
      background-color: #f3f3f3;
    }

    /* tbody tr.active-row {
      font-weight: bold;
      background-color: var(--clr-input-bg-hover);
    } */
  }
`
// TODO: Bug: Adding a field breaks cursor movement until refresh
export function CardTable({ addRow, cards, save, template }) {
  const [cell, setCell] = useState({ row: '0', col: '0' })
  const [isEditing, setIsEditing] = useState(false)
  const [tempValue, setTempValue] = useState('')

  const fields = template.fields.sort(sortByKey('order'))
  const hasData = cards.length > 0

  // Focus changed cell
  useEffect(() => {
    if (!cards.length) return

    const target = isEditing ? `#activeCell` : `#r${cell.row}-c${cell.col}`
    document.querySelector(target).focus()
  }, [cards, isEditing, cell])

  const moveCursor = (row, col) => event => {
    if (isEditing) return

    const targetCell = { row, col }

    const atTop = row === 'h'
    const atBottom = row === cards.length - 1
    const atLeft = col === 0
    const atRight = col === fields.length - 1

    switch (event.key) {
      case 'Enter':
        if (atTop && atLeft) {
          alert('You can not rename this field')
          return
        }

        setIsEditing(true)
        setTempValue(event.target.textContent)
        break

      case 'ArrowDown':
        if (atBottom) return

        targetCell.row = atTop ? 0 : row + 1
        break

      case 'ArrowUp':
        if (atTop) return

        targetCell.row = row === 0 ? 'h' : row - 1
        break

      case 'ArrowRight':
        if (atRight) return

        targetCell.col += 1
        break

      case 'ArrowLeft':
        if (atLeft) return

        targetCell.col -= 1
        break

      default:
        return
    }

    setCell(targetCell)
  }

  const checkInput = (row, id) => event => {
    switch (event.key) {
      case 'Escape':
        setIsEditing(false)
        return

      case 'Enter':
        // Don't allow line break
        event.preventDefault()
        event.cancelBubble = true

        setIsEditing(false)
        save(tempValue, row, id)
    }
  }

  const isActiveCell = (row, col) =>
    isEditing && row === cell.row && col === cell.col

  return (
    <div class={CardTableCss}>
      <h1>Card Data</h1>

      {hasData ? (
        <table class="CardTable-List">
          <thead>
            <tr>
              {fields.map((field, col) => {
                const isActive = isActiveCell('h', col)
                return (
                  <th
                    key={`rh-c${col}`}
                    id={`rh-c${col}`}
                    class={cls(isActive && 'activeCell')}
                    tabindex="0"
                    onKeyDown={moveCursor('h', col)}
                  >
                    {isActive ? (
                      <input
                        id="activeCell"
                        value={tempValue}
                        size="1"
                        onKeyDown={checkInput('h', field.id)}
                        onChange={event => setTempValue(event.target.value)}
                      />
                    ) : (
                      field.name
                    )}
                  </th>
                )
              })}
            </tr>
          </thead>
          <tbody>
            {cards.map((card, row) => (
              <tr
                key={`row-${row}`}
                class={cls(cell.row === row && 'active-row')}
              >
                {fields.map((field, col) => {
                  const isActive = isActiveCell(row, col)
                  return (
                    <td
                      key={`r${row}-c${col}`}
                      id={`r${row}-c${col}`}
                      class={cls(isActive && 'activeCell')}
                      tabindex="0"
                      onKeyDown={moveCursor(row, col)}
                    >
                      {isActive ? (
                        <input
                          id="activeCell"
                          value={tempValue}
                          size="1"
                          onKeyDown={checkInput(row, field.id)}
                          onChange={event => setTempValue(event.target.value)}
                        />
                      ) : (
                        card[field.id]
                      )}
                    </td>
                  )
                })}
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <EmptyState
          image="data"
          title="No card data found"
          content={
            <>
              <p>You have not created any card data yet.</p>

              <p>
                Each row of card data generates a card that can populate this
                template and be added to a deck.
              </p>

              <button onClick={addRow}>Add a row</button>
            </>
          }
        />
      )}
    </div>
  )
}
