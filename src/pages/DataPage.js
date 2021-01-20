import { h } from 'preact'
import { useEffect, useState } from 'preact/hooks'
// import PropTypes from 'proptypes'
// import { css } from 'linaria'

import { CardTable } from '../features/CardTable'
import { DataMenu } from '../features/Menu/DataMenu'

import { withEditorContext } from '../contexts/EditorContext'
import { useDS } from '../hooks/useDS'
import { PageCss } from '../lib/styles'
import { cls, getParams, sortByFieldOrder } from '../lib/utils'

DataPage.propTypes = {}

/**
 * Some documented component
 *
 * @component
 * @param {object} props
 * @param {string} props.templateId ID of template to load
 * @example
 * const templateId = 'ILSUMGQVg80sjZ18T6Xl'
 * return (
 *   <DataPage templateId={templateId} />
 * )
 */
function DataPage() {
  const Cards = useDS('Cards')
  const Templates = useDS('Templates')
  const Selected = useState({ row: '0', col: '0' })
  const [selected, setSelected] = Selected

  const [templateId] = getParams(['template'])
  const template = Templates.item
  const fields = template?.fields
  const fieldKeys = fields
    ? Object.keys(fields).sort(sortByFieldOrder(fields))
    : []

  const addRow = () => {
    Cards.add({ templateId, name: 'New card' })
  }

  // Add a new field with optional suffix to ensure uniqueness
  const addField = () => {
    const index = fieldKeys.length
    const field = { order: index }
    let count = 1
    let suffix = ''

    while (fieldKeys.includes(`newField${suffix}`)) {
      suffix = count.toString()
      count += 1
    }

    Templates.setItem(templateId, {
      fields: { ...template.fields, [`newField${suffix}`]: field },
    })
    setSelected({ row: 'h', col: index })
  }

  const save = value => {
    let newValue = value
    const col = selected.col - 1
    const key = col === -1 ? 'name' : fieldKeys[col]
    const field = fields[key]

    // Ensure edited field is unique by optionally appending suffix
    if (selected.row === 'h') {
      let count = 1
      let suffix = ''

      while (fieldKeys.includes(`${newValue}${suffix}`)) {
        suffix = count.toString()
        count += 1
      }

      newValue = `${newValue}${suffix}`

      const { [key]: rem, ...newFields } = fields
      Templates.setItem(templateId, {
        fields: { ...newFields, [newValue]: field },
      })

      // TODO: Rename all cards on header change
    } else {
      const card = Cards.list[selected.row]
      Cards.setItem(card.$id, { ...card, [key]: value })
      Cards.refresh('list')
    }
  }

  // Load card data
  useEffect(() => {
    if (!templateId) {
      return
    }

    Cards.getList({ templateId })
    Templates.getItem(templateId)
  }, [templateId])

  return (
    <>
      <DataMenu addField={addField} addRow={addRow} />

      <div class={cls(PageCss)}>
        {Cards.list && template && (
          <CardTable
            addRow={addRow}
            cards={Cards.list}
            save={save}
            Selected={Selected}
            template={template}
          />
        )}
      </div>
    </>
  )
}

const DataPageWithContext = withEditorContext(DataPage, true)

export { DataPageWithContext as DataPage }
