import { ReactNode } from "preact/compat";

type ModalProps = {
  children: ReactNode;
};

/**
 * Modal component; applies Daisy styling to ensure consistent UX
 *
 * @remarks
 * Because Daisy's modal uses a dialog element needing a ref for event handling
 * to open and close, this component should be placed within dialog with the ref
 */
export const Modal = ({ children }: ModalProps) => {
  return (
    <>
      <article class="modal-box p-0">
        {/* Modal Title, Content and Actions */}
        {children}
      </article>

      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </>
  );
};

Modal.Title = ({ children }: ModalProps) => (
  <section
    class="
      px-5 py-2 gap-2
      flex justify-between
      border-b border-base-content/20"
  >
    <h1 class="text-lg font-bold">{children}</h1>
  </section>
);

Modal.Content = ({ children }: ModalProps) => (
  <section class="p-5 gap-4 flex flex-col">{children}</section>
);

Modal.Actions = ({ children }: ModalProps) => (
  <section class="pr-3 pb-3 gap-1 flex flex-col">
    <footer class="modal-action m-0">{children}</footer>
  </section>
);
