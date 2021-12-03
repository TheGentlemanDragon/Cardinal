import { h } from "preact";
import { Router } from "preact-router";

import { HomePage } from "../pages/HomePage";
import { TemplatesPage } from "../pages/TemplatesPage";
import { EditorPage } from "../pages/EditorPage";
import { DataPage } from "../pages/DataPage";

import { Redirect } from "./Redirect";
import "./global.css";

export default function App() {
  return (
    <div id="app">
      <Router>
        <HomePage path="/home" />
        <TemplatesPage path="/templates" />
        <EditorPage path="/editor" />
        <DataPage path="/data" />

        <Redirect path="/" to="/home" />
      </Router>
    </div>
  );
}
