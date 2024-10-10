import {
  CreateProjectButton,
  CreateProjectModal,
} from "../features/modals/CreateProjectModal";
import { Navbar } from "../features/Navbar";
import { ProjectsEmpty } from "../features/projects/ProjectsEmpty";
import { ProjectCard } from "../features/projects/ProjectCard";
import { useProjectsList } from "../lib/projects";
import { TITLE_CLS } from "../lib/styles";
import { ProjectsLoading } from "../features/projects/ProjectsLoading";
import { isEmptyError } from "../lib/db";

/** List all projects */
const ProjectsPage = () => {
  const {
    data: projects,
    error,
    isError,
    isLoading,
    isSuccess,
  } = useProjectsList();
  const isEmpty =
    isEmptyError(error) || (isSuccess && projects.items.length === 0);

  return (
    <main class="main-bg size-full">
      <Navbar />

      <section class="grid grid-cols-3 gap-5 mx-auto max-w-screen-md pt-14">
        <div class="col-span-3 flex justify-between">
          <div class={TITLE_CLS}>Projects</div>
          <CreateProjectButton />
        </div>

        {isLoading && <ProjectsLoading />}

        {isError && !isEmpty && "Error!"}

        {isEmpty && <ProjectsEmpty />}

        {isSuccess &&
          !isEmpty &&
          projects.items.map((project) => <ProjectCard project={project} />)}
      </section>

      <CreateProjectModal />
    </main>
  );
};

export default ProjectsPage;
