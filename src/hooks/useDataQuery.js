import { useMutation, useQuery, useQueryClient } from "react-query";
import { DataStore } from "../lib/datastore";

export const Stores = {
  Assets: "Assets",
  Cards: "Cards",
  Elements: "Elements",
  Games: "Games",
  Templates: "Templates",
};

function queryKey(collection, id) {
  return [collection, id];
}

export function useDataQuery(collection, idOrQuery = null, queryOptions) {
  const isList = typeof idOrQuery !== "number";

  return useQuery(
    queryKey(collection, idOrQuery),
    () => {
      const fn = isList ? "list" : "get";
      return DataStore[collection][fn](idOrQuery);
    },
    {
      initialData: isList ? [] : {},
      ...queryOptions,
    }
  );
}

export function useDataMutation(collection, id, key = null) {
  const queryClient = useQueryClient();
  return useMutation(
    (value) =>
      id
        ? DataStore[collection].set(id, value)
        : DataStore[collection].add(value),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(queryKey(collection, key));
      },
    }
  );
}
