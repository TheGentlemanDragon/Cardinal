import { signal } from "@preact/signals-core";
import { type Ref, useRef, useState } from "preact/hooks";
import { PlusIcon } from "../icons/PlusIcon";
import { create, useProjectsList } from "../../lib/projects";

const refSignal = signal<Ref<HTMLDialogElement> | null>(null);

export const CreateProjectButton = () => (
  <button
    class="btn btn-sm btn-neutral btn-circle"
    onClick={() => refSignal.value?.current?.showModal()}
  >
    <PlusIcon />
  </button>
);

export const CreateProjectModal = () => {
  const { refetch } = useProjectsList();
  refSignal.value = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");

  const createProject = () => {
    create(name);
    refetch();
    refSignal.value?.current?.close();
  };

  return (
    <dialog class="modal" id="createProjectModal" ref={refSignal.value}>
      <article class="modal-box p-0">
        <figure>
          <img
            src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
            alt="Shoes"
          />
        </figure>

        <section class="p-10 flex flex-col gap-2">
          <h1 class="text-lg font-bold">Create a new project</h1>

          <p>
            A project is a collection of assets, templates, and decks of cards.
            You can change these values later.
          </p>

          <label class="form-control w-full max-w-xs">
            <div class="label">
              <span class="label-text">Project Title</span>
            </div>
            <input
              type="text"
              placeholder="Type here"
              class="input input-bordered w-full max-w-xs"
              onInput={(event) => setName(event.currentTarget.value)}
            />
          </label>

          <footer class="modal-action">
            <button
              class="btn btn-ghost"
              onClick={() => refSignal.value?.current?.close()}
            >
              Cancel
            </button>

            <button
              class="btn btn-primary"
              disabled={name.length === 0}
              onClick={createProject}
            >
              Confirm
            </button>
          </footer>
        </section>
      </article>

      <form method="dialog" class="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};
