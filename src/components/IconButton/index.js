import { h } from 'preact'
import PropTypes from 'proptypes'

import { noop } from 'lib/utils'
import s from './style.css'

const typeMap = {
  // insert_photo.svg
  image: (
    <path d="M42 38V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4zM17 27l5 6.01L29 24l9 12H10l7-9z" />
  ),

  // text_fields.svg
  text: <path d="M5 8v6h10v24h6V14h10V8H5zm38 10H25v6h6v14h6V24h6v-6z" />,
}

function IconButton({ type, onClick }) {
  return typeMap[type] ? (
    <svg
      class={s.IconButton}
      xmlns="http://www.w3.org/2000/svg"
      width="48"
      height="48"
      viewBox="0 0 48 48"
      onClick={onClick}
    >
      {typeMap[type]}
    </svg>
  ) : null
}

IconButton.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

IconButton.defaultProps = {
  onClic: noop,
}

export default IconButton
