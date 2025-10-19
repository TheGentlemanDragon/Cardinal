import { useRef } from "preact/hooks";
import { cls, uploadFiles } from "$lib";

const ACCEPTED_FILE_TYPES = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
];

type Props = {
  outline?: boolean;
};

export const UploadAssetsButton = ({ outline = false }: Props) => {
  const fileInputRef = useRef(null);

  const selectFilesAndUpload = () => {
    fileInputRef.current?.click();
  };

  const startUpload = (event: Event) => {
    if (!(event.target instanceof HTMLInputElement)) {
      return;
    }

    uploadFiles(event.target.files);
  };

  return (
    <>
      <input
        accept={ACCEPTED_FILE_TYPES.join(",")}
        onChange={startUpload}
        multiple
        ref={fileInputRef}
        style="display: none;"
        type="file"
      />

      <button
        class={cls("btn btn-primary", outline && "btn-outline")}
        onClick={selectFilesAndUpload}
      >
        Upload assets
      </button>
    </>
  );
};
