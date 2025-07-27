import { Page } from "../components/Page";
import { EditorCard } from "../features/editor/EditorCard";
import { EditorFooterTools } from "../features/editor/EditorFooterTools";
import { EditorMenu } from "../features/editor/EditorMenu";
import { Navbar } from "../features/Navbar";

/** Edit templates */
const EditorPage = () => {
  return (
    <Page>
      <Navbar />

      <section class="grow flex">
        <div class="flex justify-center items-center p-4">
          <EditorMenu />
        </div>
        <div class="grow flex justify-center items-center">
          <EditorCard />
        </div>
      </section>

      <EditorFooterTools />
    </Page>
  );
};

export default EditorPage;
