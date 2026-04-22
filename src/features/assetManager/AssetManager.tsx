import { signal } from "@preact/signals-core";
import { useEffect, useRef, useState } from "preact/hooks";
import { Modal } from "$components";
import { noop, type Asset, uploadingFiles, useAssetsList } from "$lib";
import { AssetContent, NoImagesContent } from "./AssetModalContent";
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

type AssetManagerProps = {
  onSelect?: (value: Asset["data"]) => void;
};

export const AssetManager = ({ onSelect = noop }: AssetManagerProps) => {
  const { data: assets } = useAssetsList();
  const [selectedAsset, setSelectedAsset] = useState<Asset | null>(null);

  const hasFiles =
    assets &&
    Object.keys(uploadingFiles.value).length + assets.items.length > 0;

  assetManagerDialog.value = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    if (!selectedAsset || !assets) {
      return;
    }

    const isSelectedAssetAvailable = assets.items.some(
      (asset) => asset.id === selectedAsset.id,
    );

    if (!isSelectedAssetAvailable) {
      setSelectedAsset(null);
    }
  }, [assets, selectedAsset]);

  const closeModal = () => {
    assetManagerDialog.value?.current?.close();
    setSelectedAsset(null);
  };

  const selectFile = () => {
    if (!selectedAsset) {
      return;
    }

    onSelect(selectedAsset.data);
    closeModal();
  };

  return (
    <dialog
      class="modal"
      id="assetManagerModal"
      onClose={() => setSelectedAsset(null)}
      ref={assetManagerDialog.value}
    >
      <Modal wide>
        <Modal.Title close>Asset Manager</Modal.Title>

        <Modal.Content>
          {hasFiles ? (
            <AssetContent
              assets={assets.items}
              onSelect={setSelectedAsset}
              selectedAssetId={selectedAsset?.id}
            />
          ) : (
            <NoImagesContent />
          )}
        </Modal.Content>

        {hasFiles && (
          <Modal.Actions>
            <div class="grow">
              <UploadAssetsButton outline />
            </div>

            <button class="btn btn-ghost" onClick={closeModal}>
              Cancel
            </button>

            <button
              class="btn btn-primary"
              disabled={!selectedAsset}
              onClick={selectFile}
            >
              Confirm
            </button>
          </Modal.Actions>
        )}
      </Modal>
    </dialog>
  );
};
