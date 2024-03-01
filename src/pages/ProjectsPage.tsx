import { Navbar } from "../features/Navbar";
import { ProjectCard } from "../features/ProjectCard";
import {
  CreateProjectButton,
  CreateProjectModal,
} from "../features/modals/CreateProjectModal";

/** List all projects */
const ProjectsPage = () => {
  return (
    <main class="main-bg size-full">
      <Navbar />

      <section class="grid grid-cols-3 gap-5 mx-auto max-w-screen-md pt-14">
        <div class="col-span-3 flex justify-between">
          <div class="text-2xl font-semibold">Projects</div>

          <CreateProjectButton />
        </div>

        <ProjectCard title="Shoes!" />
        <ProjectCard title="Oh my God!" />
        <ProjectCard title="Shoes" />

        <CreateProjectModal />
      </section>
    </main>
  );
};

export default ProjectsPage;
