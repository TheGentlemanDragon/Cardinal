import { Store, clear, get, keys, set } from "idb-keyval";

import { identity, generateId, toObjQuery } from "./utils";

// Manually create stores if they don't exist
indexedDB.open("cardinal").onupgradeneeded = function (event) {
  const db = event.target.result;

  const assetStore = db.createObjectStore("assets");
  assetStore.createIndex("$id", "$id", { unique: true });
  assetStore.createIndex("name", "name", { unique: false });
  assetStore.createIndex("hash", "hash", { unique: true });

  const cardStore = db.createObjectStore("cards");
  cardStore.createIndex("$id", "$id", { unique: true });
  cardStore.createIndex("name", "name", { unique: false });
  cardStore.createIndex("templateId", "templateId", { unique: false });

  const gameStore = db.createObjectStore("games");
  gameStore.createIndex("$id", "$id", { unique: true });
  gameStore.createIndex("name", "name", { unique: false });

  const templateStore = db.createObjectStore("templates");
  templateStore.createIndex("$id", "$id", { unique: true });
  templateStore.createIndex("name", "name", { unique: false });
  templateStore.createIndex("gameId", "gameId", { unique: false });

  const elementStore = db.createObjectStore("elements");
  elementStore.createIndex("$id", "$id", { unique: true });
  elementStore.createIndex("name", "name", { unique: false });
  elementStore.createIndex("templateId", "templateId", { unique: false });
};

function generateStore(name) {
  let store;
  try {
    store = new Store("cardinal", name);
  } catch (error) {
    console.log("ERROR");
    console.log(error);
  }

  function Instance() {}

  Instance.add = async function (value) {
    value.$id = generateId(8);
    await set(value.$id, value, store);
  };

  Instance.clear = async function () {
    await clear(store);
  };

  Instance.get = async function (id) {
    return await get(id, store);
  };

  Instance.set = async function (id, value) {
    await set(id, value, store);
  };

  Instance.list = async function (params) {
    const query = params ? toObjQuery(params) : identity;
    const objKeys = await keys(store);
    const items = await Promise.all(objKeys.map((key) => get(key, store)));
    return items.filter(query);
  };

  return Instance;
}

const DataStore = {
  Assets: generateStore("assets"),
  Cards: generateStore("cards"),
  Games: generateStore("games"),
  Templates: generateStore("templates"),
  Elements: generateStore("elements"),
};

export { DataStore };
