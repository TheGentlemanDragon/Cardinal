import { h } from "preact";
import { useState } from "preact/hooks";
import { createPortal } from "preact/compat";
import { css } from "linaria";

const ModalOverlayCss = css`
  background-color: var(--clr-bg-dark);
  height: 100vh;
  outline: none;
  position: absolute;
  top: 0;
  width: 100vw;
`;

export function useModal(Component = null) {
  const [isShowing, setIsShowing] = useState(false);

  const container = document.getElementById("modal");

  function closeModal() {
    setIsShowing(false);
  }

  function toggle() {
    setIsShowing(!isShowing);
  }

  const Modal = () =>
    Component && isShowing
      ? createPortal(
          <div
            className={ModalOverlayCss}
            aria-modal
            aria-hidden
            tabIndex={-1}
            role="dialog"
          >
            <Component closeModal={closeModal} />
          </div>,
          container
        )
      : null;

  return {
    isShowing,
    toggle,
    Modal,
  };
}
