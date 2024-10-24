import { useRoute } from "preact-iso";
import { Navbar } from "../features/Navbar";
import { QueryStatus } from "../features/QueryStatus";
import { useProject } from "../lib/projects";
import { TITLE_CLS } from "../lib/styles";

/** List project resources */
const ProjectPage = () => {
  const route = useRoute();
  const projectId = route.params.id;

  const projectQuery = useProject(projectId);
  const { data: project } = projectQuery;

  return (
    <main class="main-bg size-full">
      <Navbar />
      <section class="grid grid-cols-3 gap-5 mx-auto max-w-screen-md pt-14">
        <div class="col-span-3 flex justify-between">
          <div class={TITLE_CLS}>Templates</div>
        </div>

        <QueryStatus query={projectQuery}>
          <QueryStatus.Loading>Loading</QueryStatus.Loading>
          <QueryStatus.Error>Error</QueryStatus.Error>
          <QueryStatus.Empty>Empty</QueryStatus.Empty>

          <QueryStatus.Success>
            <pre>Page for Project {JSON.stringify(project, null, 2)}</pre>
          </QueryStatus.Success>
        </QueryStatus>
      </section>
    </main>
  );
};

export default ProjectPage;
