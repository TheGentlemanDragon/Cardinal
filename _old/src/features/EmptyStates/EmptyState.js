import { h } from "preact";
import { css } from "linaria";

import { EmptyDataSvg } from "./EmptyDataSvg";

const EmptyStateCss = css`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 2rem auto 0;
  max-width: 30rem;

  p {
    text-align: center;
  }
`;

export function EmptyState({ action, image, content, title }) {
  return (
    <div class={EmptyStateCss}>
      {image === "data" && <EmptyDataSvg />}
      <h2>{title}</h2>
      {content}
      {action}
    </div>
  );
}
