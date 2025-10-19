import { useRef } from "preact/hooks";
import { uploadFiles } from "$lib";

const ACCEPTED_FILE_TYPES = [
  "image/gif",
  "image/jpeg",
  "image/png",
  "image/webp",
];

export const UploadAssetsButton = () => {
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

      <button class="btn btn-primary mt-8 mb-4" onClick={selectFilesAndUpload}>
        Upload image(s)
      </button>
    </>
  );
};
