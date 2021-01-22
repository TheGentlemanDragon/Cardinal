import { generateId } from './utils'

export function getUniqueName(names, name) {
  let count = 1
  let suffix = ''

  while (names.includes(`${name}${suffix}`)) {
    suffix = count.toString()
    count += 1
  }

  return `${name}${suffix}`
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
