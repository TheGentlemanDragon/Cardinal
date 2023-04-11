import { h } from "preact";
import { useState } from "preact/hooks";
import PropTypes from "proptypes";
import { css } from "linaria";

import { cls, noop } from "../../lib/utils";

const ToggleCss = css`
  align-items: center;
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;

  .Toggle-Well {
    background-color: rgba(51, 51, 51);
    border-radius: 0.75rem;
    cursor: pointer;
    width: 3rem;
    height: 1rem;

    &.active {
      background-color: var(--clr-input-bg-hover);
    }
  }

  .Toggle-Dot {
    background-color: rgba(255, 255, 255);
    border-radius: 0.75rem;
    width: 1.5rem;
    height: 1.5rem;
    margin-top: -0.25rem;

    &.active {
      margin-left: 1.5rem;
    }
  }
`;

Toggle.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.bool,
  onUpdate: PropTypes.func,
};

Toggle.defaultProps = {
  value: false,
  onUpdate: noop,
};

export function Toggle({ label, value, onUpdate }) {
  const [active, setActive] = useState(value);

  const toggle = () => {
    onUpdate(!active);
    setActive(!active);
  };

  return (
    <div class={ToggleCss}>
      <label>{label}</label>
      <div class={cls(active && "active", "Toggle-Well")} onClick={toggle}>
        <div class={cls(active && "active", "Toggle-Dot")} />
      </div>
    </div>
  );
}
