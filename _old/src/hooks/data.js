import { useMutation, useQuery, useQueryClient } from "react-query";
import { DataStore } from "../lib/datastore";

export const Stores = {
  Assets: "Assets",
  Cards: "Cards",
  Elements: "Elements",
  Games: "Games",
  Templates: "Templates",
};

export function queryKey(collection, id) {
  return [collection, id];
}

export function useCollectionQuery(collection, query, queryOptions) {
  return useQuery(
    queryKey(collection, query || "*"),
    () => DataStore[collection].list(query),
    { initialData: [], ...queryOptions }
  );
}

export function useItemQuery(collection, id, queryOptions) {
  return useQuery(
    queryKey(collection, id),
    () => DataStore[collection].get(id),
    { initialData: {}, ...queryOptions }
  );
}

export function useAddMutation(collection, invalidationKeys) {
  const queryClient = useQueryClient();

  return useMutation((value) => DataStore[collection].add(value), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey(collection, "*"));

      if (invalidationKeys) {
        const [iCollection, iQuery] = invalidationKeys;
        queryClient.invalidateQueries(queryKey(iCollection, iQuery));
      }
    },
  });
}

export function useSaveMutation(collection, id) {
  const queryClient = useQueryClient();

  return useMutation((value) => DataStore[collection].set(id, value), {
    onSuccess: () => {
      queryClient.invalidateQueries(queryKey(collection, "*"));
      queryClient.invalidateQueries(queryKey(collection, id));
    },
  });
}
