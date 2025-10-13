import { Page } from "$components";
import { cls, element, setElement, useCurrentTemplate } from "$lib";
import { AssetManager } from "../features/AssetManager";
import { EditorCard } from "../features/editor/EditorCard";
import { EditorFooterTools } from "../features/editor/EditorFooterTools";
import { EditorMenu } from "../features/editor/EditorMenu";
import { PropertiesMenu } from "../features/editor/PropertiesMenu";
import { Navbar } from "../features/Navbar";
import { useClickBackground } from "../features/useClickBackground";

const panelCls = "w-72 p-6 z-10";
const onePanelCls = "grid-cols-[18rem_1fr_0rem]";
const twoPanelCls = "grid-cols-[18rem_1fr_18rem]";

/** Edit templates */
const EditorPage = () => {
  useCurrentTemplate();

  const colsStyle = element.value ? twoPanelCls : onePanelCls;

  useClickBackground(() => setElement());

  return (
    <Page>
      <Navbar />

      <section
        class={cls(
          "grid transition-all h-full place-items-center pointer-events-none",
          colsStyle
        )}
      >
        <div class={panelCls}>
          <EditorMenu />
        </div>

        <EditorCard />

        <div class={panelCls}>{element.value ? <PropertiesMenu /> : null}</div>
      </section>

      <AssetManager />

      <EditorFooterTools />
    </Page>
  );
};

export default EditorPage;
