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

const imgurAlbum = id => `https://api.imgur.com/3/album/${id}/images`

const imgurOptions = {
  method: 'GET',
  headers: new Headers({
    Authorization: 'Client-ID ' + localStorage.getItem('imgurClientId'),
  }),
}

export const addUnique = (arrayIn, item) => {
  const array = arrayIn || []
  return array.includes(item) ? array : [...array, item]
}

// /** Returns a function which executes all functions with the given arguments */
// export const broadcast = callbacks => (...args) =>
//   callbacks.forEach(fn => fn(...args))

// export const chain = callbacks => (...args) => {
//   let cb
//   while (((cb = callbacks.pop()), cb)) {
//     cb(...args)
//   }
// }

export const clone = (obj = {}) => JSON.parse(JSON.stringify(obj))

export const differ = (e1, e2) => JSON.stringify(e1) !== JSON.stringify(e2)

export const getFonts = assets =>
  assets.filter(item => item.type === 'font').map(item => item.description)

export const getTargetValue = event => event.target.value

export const hasChanged = (obj1, obj2, key) => obj1 && obj1[key] !== obj2[key]

export const newElement = index => ({
  ...defaultElement,
  name: `element${index}`,
})

export const prepAssets = async game => {
  const assets = []

  if (game.images) {
    const response = await fetch(imgurAlbum(game.images), imgurOptions)
    const json = await response.json()
    assets.push.apply(assets, json.data)
  }

  if (game.fonts) {
    assets.push.apply(
      assets,
      game.fonts.map(description => ({ description, type: 'font' }))
    )
  }

  return assets
}

export const safeParse = jsonString => {
  try {
    return JSON.parse(jsonString)
  } catch {
    return {}
  }
}

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

export const setState = key => (instance, event) =>
  instance.setState({ [key]: event.target.value })

export const toThumb = url => {
  const ext = url.substring(url.lastIndexOf('.'))
  return url.replace(ext, 't' + ext)
}

/** Execute callback with target.value from event */
// export const withTargetValue = cb => evt => cb(evt.target.value)
