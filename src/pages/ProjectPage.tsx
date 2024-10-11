import { useRoute } from "preact-iso";
import { useProject } from "../lib/projects";
import { Navbar } from "../features/Navbar";
import { QueryStatus } from "../features/QueryStatus";

/** List project resources */
const ProjectPage = () => {
  const route = useRoute();
  const projectId = route.params.id;

  const projectQuery = useProject(projectId);
  const { data: project } = projectQuery;

  return (
    <main class="main-bg size-full">
      <Navbar />
      <QueryStatus query={projectQuery}>
        <QueryStatus.Loading>Loading</QueryStatus.Loading>
        <QueryStatus.Error>Error</QueryStatus.Error>
        <QueryStatus.Empty>Empty</QueryStatus.Empty>

        <QueryStatus.Success>
          <pre>Page for Project {JSON.stringify(project, null, 2)}</pre>
        </QueryStatus.Success>
      </QueryStatus>
    </main>
  );
};

export default ProjectPage;
