import { DataStore } from './datastore'
import { generateId, getParams } from './utils'

const RETURN_CHAR = 10
const DOUBLE_QUOTE_CHAR = 34
const COMMA_CHAR = 44

/**
 * Convert ArrayBuffer to 2D string array, accounting for quote-enclosed commas
 * and linebreaks.
 *
 * @param {ArrayBuffer } buffer
 */
function arrayBufferToLines(buffer) {
  const lines = []
  const stream = new Int8Array(buffer)
  const max = stream.byteLength
  let inQuotes = false
  let word = ''
  let words = []

  for (let index = 0; index < max; index++) {
    const charCode = stream[index]

    switch (charCode) {
      case DOUBLE_QUOTE_CHAR:
        if (!inQuotes) {
          inQuotes = true
        }
        // Handle escapced double quote
        else if (stream[index + 1] === DOUBLE_QUOTE_CHAR) {
          word += '"'
          index += 1
        } else {
          inQuotes = false
        }

        break
      case COMMA_CHAR:
        if (!inQuotes) {
          words.push(word)
          word = ''
        } else {
          word += ','
        }
        break

      case RETURN_CHAR:
        if (!inQuotes) {
          words.push(word)
          word = ''
          lines.push(words)
          words = []
        } else {
          word += '\n'
        }
        break

      default:
        word += String.fromCharCode(charCode)
        break
    }
  }

  return lines
}

function loadCsv() {
  const reader = new FileReader()

  reader.onload = async event => {
    const [templateId] = getParams(['template'])
    const lines = arrayBufferToLines(event.target.result)

    const max = lines.length
    const fields = lines[0].map((item, index) =>
      newField(item.trim().toLowerCase(), index)
    )

    const template = await DataStore.Templates.get(templateId)
    DataStore.Templates.set(templateId, { ...template, fields })

    await DataStore.Cards.clear()

    for (let index = 1; index < max; index++) {
      await DataStore.Cards.add(
        newCardFromArray(lines[index], fields, templateId)
      )
    }
  }

  reader.readAsArrayBuffer(this.files[0])
}

export function getUniqueName(names, name) {
  let count = 1
  let suffix = ''

  while (names.includes(`${name}${suffix}`)) {
    suffix = count.toString()
    count += 1
  }

  return `${name}${suffix}`
}
export function importCsv() {
  const input = document.createElement('input')
  input.type = 'file'
  input.accept = '.csv'

  input.addEventListener('change', loadCsv)
  input.click()
}

export function newCardFromArray(data, fields, templateId) {
  return data.reduce(
    (card, item, index) => {
      card[fields[index].id] = item
      return card
    },
    { templateId }
  )
}

export function newField(name, order) {
  return {
    id: generateId(5),
    name,
    order,
  }
}

export function newTemplate(gameId, suffix) {
  return {
    name: `Template ${suffix}`,
    gameId,
    fields: [newField('name', 0)],
  }
}
