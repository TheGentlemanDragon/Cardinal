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

  cancel: {
    baseSize: 24,
    svg: (
      <>
        <path d="M0 0h24v24H0V0z" fill="none" opacity=".87" />
        <path d="M12 2C6.47 2 2 6.47 2 12s4.47 10 10 10 10-4.47 10-10S17.53 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8zm3.59-13L12 10.59 8.41 7 7 8.41 10.59 12 7 15.59 8.41 17 12 13.41 15.59 17 17 15.59 13.41 12 17 8.41z" />
      </>
    ),
  },

  edit: {
    baseSize: 24,
    svg: (
      <>
        <path d="M0 0h24v24H0z" fill="none" />
        <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
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

  // cursor_move.svg
  move: {
    baseSize: 24,
    svg: (
      <path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" />
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

const IconCss = css`
  border-radius: var(--radius-sm);
  cursor: pointer;
  fill: var(--clr-svg-fill);
  height: 42px;
  width: 42px;

  & + & {
    margin-left: var(--margin-sm);
  }
`

const hoverCss = css`
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`

Icon.propTypes = {
  exClass: PropTypes.string,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
}

Icon.defaultProps = {
  exClass: '',
  onClick: noop,
}

export function Icon({ exClass, type, onClick }) {
  const icon = typeMap[type]
  return icon ? (
    <svg
      class={`${exClass} ${IconCss} ${onClick === noop ? '' : hoverCss}`}
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
