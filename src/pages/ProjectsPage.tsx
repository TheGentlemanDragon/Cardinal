// import { AddAssetButton, AssetsModal } from "../features/modals/AssetsModal";
import { Page } from "../components/Page";
import { Navbar } from "../features/Navbar";
import { ProjectList } from "../features/projects/ProjectList";

/** List all projects */
const ProjectsPage = () => {
  return (
    <Page>
      <Navbar />

      <section class="grid grid-cols-3 gap-5 mx-auto max-w-(--breakpoint-md) pt-14">
        <ProjectList />

        {/* TODO: <>
          <AddAssetButton />
          <AssetsModal />
        </> */}
      </section>
    </Page>
  );
};

export default ProjectsPage;
