import { useQuery } from "@tanstack/react-query";
import {
  type Asset,
  assetsSchema,
  Collections,
  getQueryKey,
  ignore404,
  parseItems,
  type PbList,
  queryClient,
  user,
} from "$lib";

export const invalidateAssets = () =>
  queryClient.invalidateQueries({ queryKey: ["assets"] });

export function getAssets() {
  return ignore404(
    (): Promise<PbList<Asset>> =>
      Collections.Assets.getList(1, 20, {
        filter: `owner.id="${user.value?.id}"`,
      })
  );
}

export function useAssetsList() {
  return useQuery<PbList<Asset>>({
    queryFn: getAssets(),
    queryKey: getQueryKey("assets"),
    select: parseItems(assetsSchema),
  });
}
