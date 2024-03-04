import PocketBase from "pocketbase";
import { QueryClient } from "@tanstack/react-query";

export const queryClient = new QueryClient();

export type PbList<BaseType> = {
  items: BaseType[];
  page: number;
  perPage: number;
  totalItems: number;
  totalPages: number;
};

export const pb = new PocketBase("http://127.0.0.1:8090/"); // remote
