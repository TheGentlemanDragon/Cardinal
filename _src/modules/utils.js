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

const asTagSpan = tags => content => {
  let name
  let style
  let tag
  let tagCode
  let text
  let value

  if (content.startsWith('[')) {
    ;[tagCode, text] = content.substr(1, content.length - 2).split('|')
    ;[tag, name] = tagCode.split(':')
  }

  if (tag) {
    const foundTag = tags.find(tag => tag.name === name) || {}
    style = foundTag.style
    value = foundTag.value
  }

  return tag === 's' ? (
    <span style={style}>{text}</span>
  ) : tag === 'i' ? (
    <img src={value} alt={name} style={style} />
  ) : (
    <span>{content}</span>
  )
}

const imgurAlbum = id => `https://api.imgur.com/3/album/${id}/images`

const imgurOptions = {
  method: 'GET',
  headers: new Headers({
    Authorization: 'Client-ID ' + localStorage.getItem('imgurClientId'),
  }),
}

const parseData = text => {
  const start = text.indexOf('{')
  const end = text.lastIndexOf('}') + 1
  const { cols, rows } = JSON.parse(text.substring(start, end)).table
  const keys = cols.map(item => item.label)
  return rows.map(({ c: row }, i) => ({
    name: row[keys.findIndex(item => /name/i.test(item))].v,
    data: Object.fromEntries(
      row.map((item, j) => [keys[j], item ? item.v : ''])
    ),
  }))
}

const toImgurUrl = id => `https://i.imgur.com/${id}.png`

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

export const calculateStyle = (element, index, imgurUrl, isPreview = false) => {
  if (!element.style) {
    return {}
  }

  const elementStyle = element.style || {}

  const elementType = element.type || ''

  const customStyle = safeParse(elementStyle.css)

  const style = {
    ...elementStyle,
    height: elementStyle.height + 'px',
    left: elementStyle.left + 'px',
    top: elementStyle.top + 'px',
    width: elementStyle.width + 'px',
    'z-index': 1000 - index,
    ...(isPreview && customStyle),
  }

  if (isPreview && elementType.includes('Text')) {
    style['font-family'] = elementStyle.font
    style['white-space'] = 'pre-wrap'
  }

  if (isPreview && elementType.includes('Image')) {
    const url = imgurUrl || element.content
    const align = 'center center'
    const size = `${style.width} ${style.height}`
    style['background'] = `url("${url}") ${align} / ${size} no-repeat`
  }

  if (!isPreview) {
    style['line-height'] = style.height
    style['text-align'] = 'center'
  }

  return style
}

export const clone = (obj = {}) => JSON.parse(JSON.stringify(obj))

export const differ = (e1, e2) => JSON.stringify(e1) !== JSON.stringify(e2)

export const fetchSheet = async (id, name) => {
  const response = await fetch(
    `https://docs.google.com/spreadsheets/d/${id}/gviz/tq?tqx=out:json&sheet=${name}`
  )

  if (response.ok) {
    return parseData(await response.text())
  } else {
    return Promise.reject(response.status)
  }
}

export const getFonts = assets =>
  assets.filter(item => item.type === 'font').map(item => item.description)

export const getImgurUrl = (assets, name) => {
  const asset = assets.find(item => item.description === name)
  return asset ? toImgurUrl(asset.id) : ''
}

export const getTargetValue = event => event.target.value

export const hasChanged = (obj1, obj2, key) => obj1 && obj1[key] !== obj2[key]

export const newElement = index => ({
  ...defaultElement,
  name: `element${index}`,
})

export const pointInRect = point => rect =>
  rect.left <= point.x &&
  rect.right >= point.x &&
  rect.top <= point.y &&
  rect.bottom >= point.y

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

  if (game.tags) {
    assets.tags = game.tags
  }

  return assets
}

export const renderTags = (content, tags) =>
  content.split(/(\[[^\]]*\])/g).map(asTagSpan(tags))

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
