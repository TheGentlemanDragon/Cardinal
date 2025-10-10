import { Page } from "$components";
import { element, useCurrentTemplate } from "$lib";
import { EditorCard } from "../features/editor/EditorCard";
import { EditorFooterTools } from "../features/editor/EditorFooterTools";
import { EditorMenu } from "../features/editor/EditorMenu";
import { PropertiesMenu } from "../features/editor/PropertiesMenu";
import { Navbar } from "../features/Navbar";

/** Edit templates */
const EditorPage = () => {
  useCurrentTemplate();

  return (
    <Page>
      <Navbar />

      <section class="grid grid-cols-[18rem_1fr_18rem] h-full place-items-center">
        <div class="w-full p-6 z-10">
          <EditorMenu />
        </div>

        <EditorCard />

        {element.value && (
          <div class="w-full p-6 z-10">
            <PropertiesMenu />
          </div>
        )}
      </section>

      <EditorFooterTools />
    </Page>
  );
};

export default EditorPage;
