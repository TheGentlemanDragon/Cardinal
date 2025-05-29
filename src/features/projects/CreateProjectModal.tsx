import { useRef, useState } from "preact/hooks";

import { Modal } from "$components";
import { PlusIcon } from "$icons";
import { createProject, useProjectsList } from "$lib";

export const CreateProjectModalButton = () => {
  const { refetch } = useProjectsList();
  const dialog = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");

  const create = () => {
    createProject(name);
    refetch();
    dialog.current?.close();
  };

  return (
    <>
      <div className="tooltip" data-tip="Create new project">
        <button
          class="btn btn-sm btn-neutral btn-circle"
          onClick={() => dialog.current?.showModal()}
        >
          <PlusIcon />
        </button>
      </div>

      <dialog class="modal" id="createProjectModal" ref={dialog}>
        <Modal>
          <Modal.Title>Create a new project</Modal.Title>

          <Modal.Content>
            <p>
              A project is a collection of assets, templates, and decks of
              cards. You can change these values later.
            </p>

            {/* TODO: Convert to <fieldset> */}
            <label class="w-full max-w-xs">
              <div class="label">
                <span>Project Title</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                class="input"
                onInput={(event) => setName(event.currentTarget.value)}
              />
            </label>
          </Modal.Content>

          <Modal.Actions>
            <button
              class="btn btn-ghost"
              onClick={() => dialog.current?.close()}
            >
              Cancel
            </button>

            <button
              class="btn btn-primary"
              disabled={name.length === 0}
              onClick={create}
            >
              Confirm
            </button>
          </Modal.Actions>
        </Modal>
      </dialog>
    </>
  );
};
