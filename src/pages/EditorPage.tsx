import { Page } from "$components";
import { EditorCard } from "../features/editor/EditorCard";
import { EditorFooterTools } from "../features/editor/EditorFooterTools";
import { EditorMenu } from "../features/editor/EditorMenu";
import { PropertiesMenu } from "../features/editor/PropertiesMenu";
import { Navbar } from "../features/Navbar";

/** Edit templates */
const EditorPage = () => {
  return (
    <Page>
      <Navbar />

      <section class="grid grid-cols-[18rem_1fr_18rem] h-full place-items-center">
        <div class="w-full p-6 z-10">
          <EditorMenu />
        </div>

        <EditorCard />

        <div class="w-full p-6 z-10">
          <PropertiesMenu />
        </div>
      </section>

      <EditorFooterTools />
    </Page>
  );
};

export default EditorPage;
