// import { AddAssetButton, AssetsModal } from "../features/modals/AssetsModal";
import { CreateProjectModalButton } from "../features/projects/CreateProjectModal";
import { Navbar } from "../features/Navbar";
import { ProjectList } from "../features/projects/ProjectList";
import { TITLE_CLS } from "../lib/styles";

/** List all projects */
const ProjectsPage = () => {
  return (
    <main class="main-bg size-full">
      <Navbar />

      <section class="grid grid-cols-3 gap-5 mx-auto max-w-screen-md pt-14">
        <div class="col-span-3 flex justify-between">
          <div class={TITLE_CLS}>Projects</div>
          <CreateProjectModalButton />
        </div>

        <ProjectList />

        {/* TODO: <>
          <AddAssetButton />
          <AssetsModal />
        </> */}
      </section>
    </main>
  );
};

export default ProjectsPage;
