import { Component, linkEvent } from 'inferno'
import { mapStatesToProps } from 'inferno-fluxible'
import { emitEvent } from 'fluxible-js'

import PropertyGroup from '../SideBar/PropertyGroup'

const createCard = () => emitEvent('createCard')

const resetCard = () => emitEvent('resetCard')

const saveCard = () => emitEvent('saveCard')

const selectCard = card => emitEvent('setState', { card })

const updateCard = (key, event) => {
  const { value } = event.target
  emitEvent('updateCard', { key, value })
}

const Field = ({ card, element, id }) =>
  !element.type.startsWith('Static') ? (
    <div class="sidebar-property" container="row #spread @center">
      <label for={id}>{element.name}</label>
      <input
        id={id}
        type="text"
        value={card.data[element.name]}
        onInput={linkEvent(element.name, updateCard)}
      />
    </div>
  ) : null

class Cards extends Component {
  state = {
    modified: false,
  }

  render() {
    const card = false
    const { modified } = this.state
    const { cards, elements } = this.props

    return (
      <>
        <div class="sidebar-section">
          {/* Cards Section Title */}
          <div class="sidebar-section-title" container="row #spread @center">
            <label flex>Cards</label>

            <i class="icon-add-element clickable" onClick={createCard} />
          </div>

          {/* Cards List */}
          {!cards.size && (
            <div class="sidebar-list-item" container="row #middle @center">
              Click &nbsp;
              <i class="icon-add-element" /> to add a card
            </div>
          )}
          {cards.map(item => (
            <div
              key={`card-${item.name}`}
              class={
                'sidebar-list-item clickable' +
                (item === card ? ' selected' : '')
              }
              container="row #spread @center"
              onClick={linkEvent(item, selectCard)}
            >
              {/* Card Name */}
              <label flex>{item.name}</label>
            </div>
          ))}
        </div>
        {card && elements.length ? (
          <PropertyGroup
            label="Fields"
            collapsable={false}
            actions={[
              <i
                class={'icon-restore clickable' + (!modified ? ' clean' : '')}
                onClick={resetCard}
              />,
              <i
                class={
                  'icon-cloud-upload clickable' + (!modified ? ' clean' : '')
                }
                onClick={saveCard}
              />,
            ]}
          >
            {/* Name */}
            {elements.map(element => {
              const id = `field-${element.name}`
              return <Field key={id} id={id} card={card} element={element} />
            })}
          </PropertyGroup>
        ) : null}
      </>
    )
  }
}

const map = ({ cards, elements }) => ({
  cards,
  elements,
})
export default mapStatesToProps(Cards, map)
