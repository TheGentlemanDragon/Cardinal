import { CARD_CLS } from "../../lib/styles";

const ELEMENTS = ["", "", ""];

export const ProjectsLoading = () => (
  <>
    {ELEMENTS.map(() => (
      <article class={`skeleton ${CARD_CLS}`}>
        <figure class="h-32"></figure>
        <div class="card-body gap-0">
          <h2 class="card-title text-base">&nbsp;</h2>
          <p class="text-xs">&nbsp;</p>
        </div>
      </article>
    ))}
  </>
);
