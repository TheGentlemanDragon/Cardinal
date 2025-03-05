import { Navbar } from "../features/Navbar";
import { CreateTemplateModal } from "../features/templates/CreateTemplateModal";
import { TemplateList } from "../features/templates/TemplateList";
import { TITLE_CLS } from "../lib/styles";

/** List project resources */
const ProjectPage = () => {
  return (
    <main class="main-bg size-full">
      <Navbar />

      <section class="grid grid-cols-4 gap-y-5 gap-x-0 mx-auto max-w-screen-md pt-14">
        <div class="col-span-4 flex justify-between">
          <div class={TITLE_CLS}>Templates</div>
          <CreateTemplateModal />
        </div>

        <TemplateList />
      </section>
    </main>
  );
};

export default ProjectPage;
