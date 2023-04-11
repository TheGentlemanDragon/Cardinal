import { h } from "preact";
import { css } from "linaria";

const TitleCss = css`
  text-decoration: none;

  h1 {
    color: #fff;
    font-size: 2rem;
    font-weight: 400;
    line-height: 2rem;
    margin-bottom: var(--margin-lg);
    margin-top: var(--padding-y);
    text-align: center;
    text-shadow: 0px 3px 6px rgba(0, 0, 0, 0.6);
  }
`;

export function Title() {
  return (
    <a href="/home" class={TitleCss}>
      <h1>Cardinal</h1>
    </a>
  );
}
