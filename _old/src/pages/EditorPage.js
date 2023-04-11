import { h } from "preact";
// import PropTypes from 'proptypes'
import { css } from "linaria";

import { EditorCard } from "../features/EditorCard";
import { EditorMenu } from "../features/EditorMenu";

import { PageCss } from "../lib/styles";
import { cls, getParams } from "../lib/utils";

const EditorPageCss = css`
  align-items: center;
  justify-content: center;
  padding: 0;
  user-select: none;
`;

EditorPage.propTypes = {};

/**
 * Some documented component
 *
 * @component
 * @param {object} props
 * @param {string} props.templateId ID of template to load
 * @example
 * const templateId = 'ILSUMGQVg80sjZ18T6Xl'
 * return (
 *   <EditorPage templateId={templateId} />
 * )
 */
function EditorPage() {
  const [gameId, templateId] = getParams(["game", "template"]);

  return (
    <>
      <EditorMenu gameId={gameId} templateId={templateId} />

      <div class={cls(EditorPageCss, PageCss)}>
        <EditorCard templateId={templateId} />
      </div>
    </>
  );
}

export { EditorPage };
