import PocketBase from "pocketbase";
import { QueryClient } from "@tanstack/react-query";
import { DB_URL } from "./config";


export const queryClient = new QueryClient();

export type PbList<BaseType> = {
  items: BaseType[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
};

export const pb = new PocketBase(DB_URL);