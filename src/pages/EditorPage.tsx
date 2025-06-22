import { Page } from "../components/Page";
import { EditorCard } from "../features/editor/EditorCard";
import { EditorNav } from "../features/editor/EditorNav";
import { ScaleSilder } from "../features/editor/ScaleSlider";
import { Navbar } from "../features/Navbar";

/** Edit templates */
const EditorPage = () => {
  return (
    <Page>
      <Navbar />

      <EditorNav />
      <EditorCard />
      <ScaleSilder />
    </Page>
  );
};

export default EditorPage;
