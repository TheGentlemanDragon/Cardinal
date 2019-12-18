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

export const composeCards = (elements, cards) => {
  return []
}

export const differ = (e1, e2) => JSON.stringify(e1) !== JSON.stringify(e2)

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
