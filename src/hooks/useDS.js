import { useReducer } from "preact/hooks";

import { DataStore } from "../lib/datastore";

const initialState = {
  itemId: undefined,
  listParams: undefined,
  list: [],
  item: undefined,
};

const reducer = (state, value) => ({ ...state, ...value });

const scopes = ["all", "item", "list"];

export function useDS(storeName) {
  const store = DataStore[storeName] || null;
  const [state, dispatch] = useReducer(reducer, initialState);

  const getItem = async (id) => {
    const item = await store.get(id);
    dispatch({ itemId: id, item });
    return item;
  };

  const setItem = async (id, value) => {
    const item = await store.get(id);
    await store.set(id, { ...item, ...value });
    return getItem(id);
  };

  const getList = async (listParams) => {
    const list = await store.list(listParams);
    dispatch({ listParams, list });
    return list;
  };

  const refresh = async (scope) => {
    if (!scopes.includes(scope)) {
      throw new Error("Must specify refresh scope: 'all', 'item', 'list'");
    }

    const value = {};

    if (scope === "all" || scope === "list") {
      value.list = await store.list(state.listParams);
    }

    if (scope === "all" || scope === "item") {
      value.item = await store.get(state.itemId);
    }

    dispatch(value);
  };

  const add = async (value) => {
    await store.add(value);
    refresh("list");
  };

  return {
    add,
    getItem,
    getList,
    item: state.item,
    list: state.list,
    refresh,
    setItem,
  };
}
