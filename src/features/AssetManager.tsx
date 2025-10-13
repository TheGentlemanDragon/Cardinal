import { signal } from "@preact/signals-core";
import { useRef } from "preact/hooks";
import { Modal } from "$components";

const assetManagerDialog = signal<any>(null);

const NoImagesContent = ({ upload }) => {
  return (
    <div class="flex flex-col items-center">
      <figure>
        <img src="/images/NoImages.png" alt="Shoes" />
      </figure>

      <h2 class="card-title">No images</h2>

      <p>Upload an image to get started.</p>

      <button class="btn btn-primary mt-8 mb-4" onClick={upload}>
        Upload image
      </button>
    </div>
  );
};

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
  const hasFiles = false;
  const fileInput = useRef(null);

  assetManagerDialog.value = useRef<HTMLDialogElement>(null);

  const uploadFile = (event) => {
    console.log("Uploading file");
  };

  const selectFile = (event) => {
    console.log("Selecting file");
  };

  return (
    <dialog
      class="modal"
      id="createProjectModal"
      ref={assetManagerDialog.value}
    >
      <Modal>
        <Modal.Title close>Asset Manager</Modal.Title>

        <Modal.Content>
          <NoImagesContent upload={uploadFile} />
        </Modal.Content>

        {hasFiles && (
          <Modal.Actions>
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

/*

  import { useModal } from "./useModal";
  import { DataImage } from "../features/DataImage";
  import { ActionButton } from "../features/UI/ActionButton";
  import { Stores, useCollectionQuery } from "../hooks/data";
  import { MenuCss, MenuPanelCss, SearchInputCss } from "../lib/styles";
  import { importFile, noop } from "../lib/utils";

  const IMAGE_WIDTH = 234;
  const PADDING = 16;

  const { data: assets } = useCollectionQuery(Stores.Assets);
  const [selected, setSelected] = useState("");

  // const imageFile = await importFile(event);
  // Assets.add(imageFile);

  // Get 3-column flow offset map for each image asset
  const offsets = useMemo(() => {
    if (!assets.length) {
      return [];
    }

    const columns = [
      { x: 0, y: 0 },
      { x: PADDING + IMAGE_WIDTH, y: 0 },
      { x: 2 * (PADDING + IMAGE_WIDTH), y: 0 },
    ];

    return assets.map((item) => {
      // Move first column to end, once it is larger
      if (columns[0].y > columns[1].y) {
        columns.push(columns.shift());
      }

      const offset = { ...columns[0] };
      columns[0].y += PADDING + (IMAGE_WIDTH / item.width) * item.height;

      return offset;
    });
  }, [Assets]);

  <div class={MenuPanelCss}>
    <ActionButton
      caption="Add Image"
      icon="addImage"
      onClick={() => fileInput.current?.click()}
    />

    <ActionButton caption="Add URL" icon="addUrl" onClick={noop} />
  </div>

  <div class="AssetManager-Content">
    <div class="AssetManager-Header">
      <h2 class="AssetManager-Title">Game Assets</h2>
      <input class={SearchInputCss} type="text" placeholder="Search" />
    </div>

    <div class="AssetManager-List">
      {assets.map((item, index) => (
        <DataImage
          image={item}
          offset={offsets[index]}
          width={IMAGE_WIDTH}
        />
      ))}
    </div>
  </div>

  <input
    ref={fileInput}
    type="file"
    multiple
    accept="image/*"
    onChange={uploadFile}
    style="display:none"
  />
*/
