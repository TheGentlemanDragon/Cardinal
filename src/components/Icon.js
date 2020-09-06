import { h } from 'preact'
import PropTypes from 'proptypes'
import { css } from 'linaria'

import { noop } from '../lib/utils'

const typeMap = {
  // add_box.svg
  add: {
    baseSize: 24,
    svg: (
      <>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
      </>
    ),
  },

  // insert_photo.svg
  image: {
    baseSize: 48,
    svg: (
      <path d="M42 38V10c0-2.21-1.79-4-4-4H10c-2.21 0-4 1.79-4 4v28c0 2.21 1.79 4 4 4h28c2.21 0 4-1.79 4-4zM17 27l5 6.01L29 24l9 12H10l7-9z" />
    ),
  },

  resize: {
    baseSize: 24,
    svg: (
      <path d="M6 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z m12-8c0 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z m-6 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z m6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z m0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z m-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    ),
  },

  // text_fields.svg
  text: {
    baseSize: 48,
    svg: <path d="M5 8v6h10v24h6V14h10V8H5zm38 10H25v6h6v14h6V24h6v-6z" />,
  },
}

const mainCss = css`
  border-radius: var(--radius-sm);
  cursor: pointer;
  fill: var(--clr-svg-fill);
  height: 42px;
  width: 42px;

  & + & {
    margin-left: var(--g-margin-sm);
  }
`

const hoverCss = css`
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }
`

Icon.propTypes = {
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

Icon.defaultProps = {
  size: 0,
  onClick: noop,
}

export function Icon({ type, onClick }) {
  const icon = typeMap[type]
  return icon ? (
    <svg
      class={`${mainCss} ${onClick === noop ? '' : hoverCss}`}
      xmlns="http://www.w3.org/2000/svg"
      width={`${icon.baseSize}`}
      height={`${icon.baseSize}`}
      viewBox={`0 0 ${icon.baseSize} ${icon.baseSize}`}
      onClick={onClick}
    >
      {icon.svg}
    </svg>
  ) : null
}
