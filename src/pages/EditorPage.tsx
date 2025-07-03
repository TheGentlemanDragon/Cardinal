import { Page } from "../components/Page";
import { EditorCard } from "../features/editor/EditorCard";
import { EditorFooterTools } from "../features/editor/EditorFooterTools";
import { EditorMenuStack } from "../features/editor/EditorMenuStack";
import { Navbar } from "../features/Navbar";

/** Edit templates */
const EditorPage = () => {
  return (
    <Page>
      <Navbar />

      <section class="grow flex">
        <div class="flex items-center p-4">
          <EditorMenuStack />
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
