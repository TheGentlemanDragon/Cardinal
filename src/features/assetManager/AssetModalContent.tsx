import { HTMLAttributes } from "preact/compat";
import { type Asset, pb, uploadingFiles } from "$lib";
import { UploadAssetsButton } from "./UploadAssetsButton";

export const NoImagesContent = () => {
  return (
    <div class="flex flex-col items-center">
      <figure>
        <img
          src="/images/NoImages.png"
          alt="Shoes"
          class="transform scale-75"
        />
      </figure>

      <h2 class="card-title">No images</h2>

      <p>Upload an image to get started.</p>

      <div class="mt-8 mb-4">
        <UploadAssetsButton />
      </div>
    </div>
  );
};

type Props = {
  assets: Asset[];
};

export const AssetContent = ({ assets }: Props) => {
  const allAssets = [
    ...Object.values(uploadingFiles.value).map((item) => ({
      ...item.file,
      percent: item.percent,
    })),
    ...assets,
  ];

  return (
    <div class="flex flex-wrap ml-3 gap-3 items-center">
      {allAssets.map((file) => {
        const isUploading = "percent" in file;
        const progressProps = isUploading
          ? ({
              className: "radial-progress",
              style: `--value:${file.percent}`,
              "aria-valuenow": file.percent,
              role: "progressbar",
            } as HTMLAttributes<HTMLDivElement>)
          : {};

        return (
          <div class="card bg-neutral text-neutral-content overflow-hidden w-28">
            {isUploading ? (
              <div class="card-body items-center text-center">
                <h2 class="card-title block truncate w-28">{file.name}</h2>
                <div {...progressProps}>{file.percent}%</div>
              </div>
            ) : (
              <figure>
                <img
                  alt={file.name}
                  class="w-full object-cover"
                  src={pb.files.getUrl(file, file.data, { thumb: "100x100" })}
                />
              </figure>
            )}
          </div>
        );
      })}
    </div>
  );
};
