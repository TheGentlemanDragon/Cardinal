import { h } from "preact";
import PropTypes from "proptypes";
import { css } from "linaria";

import { noop } from "../../lib/utils";

const typeMap = {
  // add_box.svg
  add: {
    svg: (
      <path d="M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z" />
    ),
  },

  addImage: {
    svg: (
      <path d="M19 7v2.99s-1.99.01-2 0V7h-3s.01-1.99 0-2h3V2h2v3h3v2h-3zm-3 4V8h-3V5H5c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2v-8h-3zM5 19l3-4 2 3 3-4 4 5H5z" />
    ),
  },

  addUrl: {
    svg: (
      <>
        <path d="m16.93109,3.19392zm1.92,8c0.04,0.33 0.08,0.66 0.08,1c0,2.08 -0.8,3.97 -2.1,5.39c-0.26,-0.81 -1,-1.39 -1.9,-1.39l-1,0l0,-3c0,-0.55 -0.45,-1 -1,-1l-6,0l0,-2l2,0c0.55,0 1,-0.45 1,-1l0,-2l2,0c1.1,0 2,-0.9 2,-2l0,-2.54c-0.95,-0.3 -1.95,-0.46 -3,-0.46c-5.52,0 -10,4.48 -10,10s4.48,10 10,10s10,-4.48 10,-10c0,-0.34 -0.02,-0.67 -0.05,-1l-2.03,0zm-8.92,8.93c-3.95,-0.49 -7,-3.85 -7,-7.93c0,-0.62 0.08,-1.21 0.21,-1.79l4.79,4.79l0,1c0,1.1 0.9,2 2,2l0,1.93z" />
        <path d="m19,6.9375l0,2.99s-1.99,0.01 -2,0l0,-2.99l-3,0s0.01,-1.99 0,-2l3,0l0,-3l2,0l0,3l3,0l0,2l-3,0z" />
      </>
    ),
  },

  back: {
    svg: (
      <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
    ),
  },

  cancel: {
    svg: (
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    ),
  },

  edit: {
    svg: (
      <path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34c-.39-.39-1.02-.39-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z" />
    ),
  },

  // action/done
  done: {
    svg: <path d="M9 16.2L4.8 12l-1.4 1.4L9 19 21 7l-1.4-1.4L9 16.2z" />,
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
    svg: (
      <path d="M13,6V11H18V7.75L22.25,12L18,16.25V13H13V18H16.25L12,22.25L7.75,18H11V13H6V16.25L1.75,12L6,7.75V11H11V6H7.75L12,1.75L16.25,6H13Z" />
    ),
  },

  resize: {
    svg: (
      <path d="M6 16c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z m12-8c0 0 2-.9 2-2s-.9-2-2-2-2 .9-2 2 .9 2 2 2z m-6 8c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z m6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z m0-6c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z m-6 0c-1.1 0-2 .9-2 2s.9 2 2 2 2-.9 2-2-.9-2-2-2z" />
    ),
  },

  table: {
    svg: (
      <g>
        <rect fill="none" height="24" width="24" />
        <path d="M19,7H9C7.9,7,7,7.9,7,9v10c0,1.1,0.9,2,2,2h10c1.1,0,2-0.9,2-2V9C21,7.9,20.1,7,19,7z M19,9v2H9V9H19z M13,15v-2h2v2H13z M15,17v2h-2v-2H15z M11,15H9v-2h2V15z M17,13h2v2h-2V13z M9,17h2v2H9V17z M17,19v-2h2v2H17z M6,17H5c-1.1,0-2-0.9-2-2V5 c0-1.1,0.9-2,2-2h10c1.1,0,2,0.9,2,2v1h-2V5H5v10h1V17z" />
      </g>
    ),
  },

  // text_fields.svg
  text: {
    baseSize: 48,
    svg: <path d="M5 8v6h10v24h6V14h10V8H5zm38 10H25v6h6v14h6V24h6v-6z" />,
  },

  toggleOff: {
    svg: (
      <path d="M17 7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h10c2.76 0 5-2.24 5-5s-2.24-5-5-5zM7 15c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
    ),
  },

  toggleOn: {
    svg: (
      <path d="M17 7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h10c2.76 0 5-2.24 5-5s-2.24-5-5-5zm0 8c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3z" />
    ),
  },
};

const IconCss = css`
  border-radius: var(--radius-sm);
  cursor: pointer;
  fill: var(--clr-svg-fill);
  height: 42px;
  width: 42px;
`;

const MarginLeftCss = css`
  margin-left: var(--margin-sm);
`;

const MarginTopCss = css`
  margin-top: var(--margin-sm);
`;

const hoverCss = css`
  &:hover {
    background-color: rgba(0, 0, 0, 0.2);
  }
`;

Icon.propTypes = {
  exClass: PropTypes.string,
  type: PropTypes.string.isRequired,
  onClick: PropTypes.func,
};

Icon.defaultProps = {
  exClass: "",
  onClick: noop,
  margin: "",
};

export function Icon({ exClass, type, margin, onClick }) {
  const icon = typeMap[type];
  const baseSize = icon.baseSize || 24;

  return icon ? (
    <svg
      class={`
        ${exClass}
        ${IconCss}
        ${margin === "left" && MarginLeftCss}
        ${margin === "top" && MarginTopCss}
        ${onClick !== noop && hoverCss}
      `}
      xmlns="http://www.w3.org/2000/svg"
      width={`${baseSize}`}
      height={`${baseSize}`}
      viewBox={`0 0 ${baseSize} ${baseSize}`}
      onClick={onClick}
    >
      {icon.svg}
    </svg>
  ) : null;
}
