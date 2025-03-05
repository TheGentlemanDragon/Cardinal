import { useRoute } from "preact-iso";
import { useRef, useState } from "preact/hooks";

import { Modal } from "$components";
import { PlusIcon } from "$icons";
import { createTemplate, useTemplatesList } from "$lib";

export const CreateTemplateModal = () => {
  const route = useRoute();
  const projectId = route.params.id;

  const { refetch } = useTemplatesList(projectId);
  const dialog = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");

  const create = () => {
    createTemplate(name, projectId);
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
          <Modal.Title>Create a new template</Modal.Title>

          <Modal.Content>
            <p>
              A templates is a card blueprint consisting of static or dynamic
              text and/or images. You can change these values later.
            </p>

            <label class="form-control w-full max-w-xs">
              <div class="label">
                <span class="label-text">Template Name</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                class="input input-bordered w-full max-w-xs"
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
