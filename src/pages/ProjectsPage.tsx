// import { AddAssetButton, AssetsModal } from "../features/modals/AssetsModal";
import { Navbar } from "../features/Navbar";
import { ProjectList } from "../features/projects/ProjectList";

/** List all projects */
const ProjectsPage = () => {
  return (
    <main class="main-bg size-full">
      <Navbar />

      <section class="grid grid-cols-3 gap-5 mx-auto max-w-screen-md pt-14">
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
