import { h } from "preact";
import { route } from "preact-router";
import PropTypes from "proptypes";

import { ActionButton } from "./ActionButton";
import { Title } from "../Title";
import { SelectStore } from "../UI/SelectStore";

import { queryKey, Stores, useAddMutation } from "../../hooks/data";
import { newTemplate } from "../../lib/models";
import { MenuCss } from "../../lib/styles";

TemplatesMenu.propTypes = {
  gameId: PropTypes.string.isRequired,
};

TemplatesMenu.defaultProps = {};

/** List games for the main page */
export function TemplatesMenu({ gameId }) {
  const { mutate: addTemplate } = useAddMutation(
    Stores.Templates,
    queryKey(Stores.Templates, { gameId })
  );

  const addTemplateData = () => {
    const count = document.getElementsByClassName("template").length;
    addTemplate(newTemplate(gameId, count));
  };

  return (
    <div class={MenuCss}>
      <Title />

      <div class="Menu-Panel">
        <SelectStore
          collection={Stores.Games}
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
          onClick={addTemplateData}
        />
      </div>
    </div>
  );
}
