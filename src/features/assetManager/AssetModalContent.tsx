import { HTMLAttributes } from "preact/compat";
import { Trash } from "lucide-preact";
import { IconAction } from "$components";
import { deleteAsset, type Asset, pb, uploadingFiles, cls } from "$lib";
import { UploadAssetsButton } from "./UploadAssetsButton";

type ImageAssetProps = {
  asset: Asset;
  isSelected: boolean;
  onSelect: (asset: Asset | null) => void;
};

const ImageAsset = ({ asset, isSelected, onSelect }: ImageAssetProps) => {
  const deleteImage = async () => {
    if (isSelected) {
      onSelect(null);
    }

    await deleteAsset(asset.id);
  };

  return (
    <figure
      class={cls("group relative cursor-pointer rounded-2xl", {
        "outline-4 outline-offset-3 outline-primary": isSelected,
      })}
      onClick={() => onSelect(isSelected ? null : asset)}
    >
      <img
        alt={asset.name}
        class="w-full object-cover"
        src={pb.files.getUrl(asset, asset.data, { thumb: "100x100" })}
      />

      <div class="absolute top-1 right-1">
        <IconAction icon={Trash} size="small" onConfirm={deleteImage} />
      </div>
    </figure>
  );
};

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
  onSelect: (asset: Asset | null) => void;
  selectedAssetId?: Asset["id"];
};

export const AssetContent = ({ assets, onSelect, selectedAssetId }: Props) => {
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
          <div
            class={cls("card bg-neutral text-neutral-content w-28", {
              "cursor-pointer": !isUploading,
            })}
          >
            {isUploading ? (
              <div class="card-body items-center text-center">
                <h2 class="card-title block truncate w-28">{file.name}</h2>
                <div {...progressProps}>{file.percent}%</div>
              </div>
            ) : (
              <ImageAsset
                asset={file}
                isSelected={selectedAssetId === file.id}
                onSelect={onSelect}
              />
            )}
          </div>
        );
      })}
    </div>
  );
};
