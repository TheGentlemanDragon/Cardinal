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

export function useDataQuery(collection, query = null, queryOptions) {
  return useQuery(
    queryKey(collection, query),
    () => {
      const fn = typeof query === "number" ? "get" : "list";
      return DataStore[collection][fn](query);
    },
    queryOptions
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
