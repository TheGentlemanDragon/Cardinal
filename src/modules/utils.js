const defaultElement = {
  name: '',
  type: 'Dynamic Text',
  style: {
    top: 0,
    left: 0,
    width: 50,
    height: 15,
  },
}

export const composeCards = (elements, cards) => {
  return []
}

export const differ = (e1, e2) => JSON.stringify(e1) !== JSON.stringify(e2)

export const setDeep = (obj, key, value) => {
  const parts = key.split('.')

  let part
  let nested = obj
  while ((part = parts.shift())) {
    if (!parts.length) {
      break
    }
    if (!nested.hasOwnProperty(part)) {
      nested[part] = {}
    }
    nested = nested[part]
  }
  nested[part] = value

  return { ...obj }
}

export const newElement = index => ({
  ...defaultElement,
  name: `element${index}`,
})
