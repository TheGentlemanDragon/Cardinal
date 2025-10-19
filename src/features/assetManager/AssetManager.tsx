import { signal } from "@preact/signals-core";
import { useRef } from "preact/hooks";
import { Modal } from "$components";
import { uploadingFiles, useAssetsList } from "$lib";
import { AssetsContent, NoImagesContent } from "./AssetsModalContent";
import { UploadAssetsButton } from "./UploadAssetsButton";

const assetManagerDialog = signal<any>(null);

export const AssetManagerButton = () => {
  return (
    <div class="tooltip" data-tip="Open Asset Manager">
      <button
        class="btn btn-sm btn-neutral"
        onClick={() => assetManagerDialog.value?.current.showModal()}
      >
        Open Asset Manager
      </button>
    </div>
  );
};

export const AssetManager = () => {
  const { data: assets } = useAssetsList();

  const hasFiles =
    Object.keys(uploadingFiles.value).length + assets?.items.length > 0;

  assetManagerDialog.value = useRef<HTMLDialogElement>(null);

  const selectFile = (event) => {
    console.log("Selecting file");
  };

  return (
    <dialog
      class="modal"
      id="createProjectModal"
      ref={assetManagerDialog.value}
    >
      <Modal wide>
        <Modal.Title close>Asset Manager</Modal.Title>

        <Modal.Content>
          {hasFiles ? (
            <AssetsContent assets={assets.items} />
          ) : (
            <NoImagesContent />
          )}
        </Modal.Content>

        {hasFiles && (
          <Modal.Actions>
            <div class="grow">
              <UploadAssetsButton outline />
            </div>

            <button
              class="btn btn-ghost"
              onClick={() => assetManagerDialog.value?.current?.close()}
            >
              Cancel
            </button>

            <button class="btn btn-primary" onClick={selectFile}>
              Confirm
            </button>
          </Modal.Actions>
        )}
      </Modal>
    </dialog>
  );
};
