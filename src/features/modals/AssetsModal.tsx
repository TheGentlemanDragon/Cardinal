import { signal } from "@preact/signals-core";
import { type Ref, useRef, useState } from "preact/hooks";
import { PlusIcon } from "../icons/PlusIcon";
import { create, useProjectsList } from "../../lib/projects";

const refSignal = signal<Ref<HTMLDialogElement> | null>(null);

export const AddAssetButton = () => (
  <div className="tooltip" data-tip="Add an asset">
    <button
      class="btn btn-sm btn-neutral btn-circle"
      onClick={() => refSignal.value?.current?.showModal()}
    >
      <PlusIcon />
    </button>
  </div>
);

export const AssetsModal = () => {
  const { refetch } = useProjectsList();
  refSignal.value = useRef<HTMLDialogElement>(null);
  const [name, setName] = useState("");

  const createProject = () => {
    create(name);
    refetch();
    refSignal.value?.current?.close();
  };

  return (
    <dialog class="modal" id="AssetsModal" ref={refSignal.value}>
      <article class="modal-box p-0">
        {/* Modal header */}
        <section class="p-2 pl-4 flex justify-between gap-2 border-b border-base-content/20">
          {/* Modal title */}
          <h1 class="text-lg font-bold">Add an asset</h1>

          {/* Top right close button */}
          <form className="align-middle" method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost">✕</button>
          </form>
        </section>

        <section class="p-4 flex flex-col gap-1">
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
