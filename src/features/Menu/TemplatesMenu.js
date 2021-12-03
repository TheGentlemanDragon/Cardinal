import { h } from "preact";
import { route } from "preact-router";
import PropTypes from "proptypes";

import { ActionButton } from "./ActionButton";
import { Title } from "../Title";
import { SelectCollection } from "../UI/SelectCollection";

import { newTemplate } from "../../lib/models";
import { MenuCss } from "../../lib/styles";

// TODO: Add DS proptype
TemplatesMenu.propTypes = {
  gameId: PropTypes.string.isRequired,
  Templates: PropTypes.object.isRequired,
};

TemplatesMenu.defaultProps = {};

/** List games for the main page */
export function TemplatesMenu({ gameId, Templates }) {
  const addTemplate = () => {
    const count = document.getElementsByClassName("template").length;
    Templates.add(newTemplate(gameId, count));
  };

  return (
    <div class={MenuCss}>
      <Title />

      <div class="Menu-Panel">
        <SelectCollection
          collection="Games"
          labelKey="name"
          name="Game"
          value={gameId}
          valueKey="$id"
          onSelect={(game) => route(`templates?game=${game.$id}`)}
        />
      </div>

      <div class="Menu-Panel">
        <ActionButton
          caption="Add Template"
          icon="text"
          onClick={addTemplate}
        />
      </div>
    </div>
  );
}
