import { isEmptyError, type PbList } from "../../lib/db";
import { type Project, useProjectsList } from "../../lib/projects";
import { QueryStatus } from "../QueryStatus";
import { ProjectCard } from "./ProjectCard";
import { ProjectsEmpty } from "./ProjectsEmpty";
import { ProjectsLoading } from "./ProjectsLoading";

/** List all projects */
export const ProjectList = () => {
  const projectsQuery = useProjectsList();
  const { data: projects, error } = projectsQuery;

  return (
    <QueryStatus
      query={projectsQuery}
      isEmpty={(data: PbList<Project>) =>
        isEmptyError(error) || data.items.length === 0
      }
    >
      <QueryStatus.Loading>
        <ProjectsLoading />
      </QueryStatus.Loading>

      <QueryStatus.Error>Error!</QueryStatus.Error>

      <QueryStatus.Empty>
        <ProjectsEmpty />
      </QueryStatus.Empty>

      <QueryStatus.Success>
        {projects?.items.map((project) => (
          <ProjectCard project={project} />
        ))}
      </QueryStatus.Success>
    </QueryStatus>
  );
};
