import { Project } from "../../lib/projects";
import { PROJECT_CARD_CLS } from "../../lib/styles";
import { timeSince } from "../../lib/utils";

type Props = {
  project: Project;
};

export const ProjectCard = ({ project }: Props) => {
  return (
    <article class={PROJECT_CARD_CLS}>
      <figure class="max-h-32">
        <img
          src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
          alt="Shoes"
        />
      </figure>
      <div class="card-body gap-0">
        <h2 class="card-title text-base">{project.name}</h2>
        <p class="text-xs">{timeSince(project.created)}</p>
      </div>
    </article>
  );
};
