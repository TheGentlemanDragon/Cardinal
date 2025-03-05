import { CARD_CLS } from "$lib";

const ELEMENTS = ["", "", ""];

export const TemplatesLoading = () => (
  <>
    {ELEMENTS.map(() => (
      <article
        class={`
          skeleton ${CARD_CLS}
          w-40 h-64 aspect-[0.712]
          border-[#1565c0] border-2 border-dashed
        `}
      >
        <figure class="h-32"></figure>
        <div class="card-body">
          <h2 class="card-title text-base">&nbsp;</h2>
          <p class="text-xs">&nbsp;</p>
        </div>
      </article>
    ))}
  </>
);
