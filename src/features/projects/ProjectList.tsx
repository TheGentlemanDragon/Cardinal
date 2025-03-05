import { isEmptyError, type PbList } from "../../lib/db";
import { type Project, useProjectsList } from "../../lib/projects";
import { TITLE_CLS } from "../../lib/styles";
import { EmptyState } from "../EmptyState";
import { QueryStatus } from "../QueryStatus";
import { CreateProjectModalButton } from "./CreateProjectModal";
import { ProjectCard } from "./ProjectCard";
import { ProjectsLoading } from "./ProjectsLoading";

/** List all projects */
export const ProjectList = () => {
  const projectsQuery = useProjectsList();
  const { data: projects, error } = projectsQuery;

  return (
    <>
      <div class="col-span-3 flex justify-between">
        <div class={TITLE_CLS}>Projects</div>
        <CreateProjectModalButton />
      </div>

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
          <EmptyState title="Create a Project">
            Projects are collections of assets, templates, and decks of cards.
            You currently do not have any projects. Click the + button to create
            one.
          </EmptyState>
        </QueryStatus.Empty>

        <QueryStatus.Success>
          {projects?.items.map((project) => (
            <ProjectCard project={project} />
          ))}
        </QueryStatus.Success>
      </QueryStatus>
    </>
  );
};
