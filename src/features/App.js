import { h } from "preact";
import { Router } from "preact-router";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";

import { HomePage } from "../pages/HomePage";
import { TemplatesPage } from "../pages/TemplatesPage";
import { EditorPage } from "../pages/EditorPage";
import { DataPage } from "../pages/DataPage";

import { Redirect } from "./Redirect";
import "./global.css";

// const DEFAULT_STALE_TIME = 1800000; // Standard cache time is 30 mins

export const QUERY_CLIENT_CONFIG = new QueryClient({
  //   defaultOptions: {
  //     mutations: {
  //       retry: false,
  //     },
  //     queries: {
  //       retry: false,
  //       refetchOnWindowFocus: false,
  //       staleTime: DEFAULT_STALE_TIME,
  //     },
  //   },
});

export default function App() {
  return (
    <QueryClientProvider client={QUERY_CLIENT_CONFIG}>
      <Router>
        <HomePage path="/home" />
        <TemplatesPage path="/templates" />
        <EditorPage path="/editor" />
        <DataPage path="/data" />

        <Redirect path="/" to="/home" />
      </Router>
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
  );
}
