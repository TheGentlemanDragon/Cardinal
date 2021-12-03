import { h } from "preact";

import { css } from "linaria";

import { Icon } from "./UI/Icon";
import { useEditableValue } from "../hooks/useEditableValue";
import { DataStore } from "../lib/datastore";
import { goToUrl, noop } from "../lib/utils";

const GameItemCss = css`
  background-color: var(--clr-bg-card);
  border-radius: var(--radius-sm);
  box-shadow: var(--box-shadow-md);
  color: var(--clr-text-darker);
  display: flex;
  height: 8rem;
  margin: 0 0 1.2rem;

  .GameItem_Thumbnail {
    align-items: center;
    border: var(--border-dark);
    display: flex;
    justify-content: center;
    margin: 1rem 2rem 1rem 1rem;
    min-width: 10rem;
  }

  .GameItem_Details {
    flex-grow: 1;
  }

  .GameItem_Name {
    cursor: pointer;
    display: flex;
    font-size: 1.2rem;
  }

  .GameItem_Menu {
    border-left: var(--border-dark);
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    margin: 0;
    padding: 0.5rem;
  }

  .GameItem_MenuItem {
    display: flex;
    flex: 1;
    flex-direction: column-reverse;
    justify-content: space-between;

    svg {
      fill: var(--clr-bg-dark);
      flex: 1;
      padding: 0.25rem;
      width: 2rem;
    }

    svg.GameItem_Save {
      background-color: var(--clr-save);
    }
    svg.GameItem_Save:hover {
      background-color: var(--clr-save-hover);
    }

    svg.GameItem_Cancel {
      background-color: var(--clr-alert);
    }
    svg.GameItem_Cancel:hover {
      background-color: var(--clr-alert-hover);
    }
  }

  .GameItem_Underline {
    &:hover {
      text-decoration: underline;
    }
  }
`;

GameItem.defaultProps = {
  game: {},
};

export function GameItem({ game }) {
  const setName = (name) => {
    DataStore.Games.set(game.$id, { ...game, name });
  };

  const Name = useEditableValue({ initial: game.name, onSave: setName });

  return (
    <>
      <div class={`game ${GameItemCss}`}>
        <figure class="GameItem_Thumbnail">Preview</figure>

        <dl class="GameItem_Details">
          {/* TODO: Convert to anchor tag */}
          <dt
            class={`GameItem_Name ${!Name.isEditMode && "GameItem_Underline"}`}
            onClick={
              Name.isEditMode ? noop : goToUrl(`templates?game=${game.$id}`)
            }
          >
            {Name.Node}
          </dt>
          <dd>{game.description}</dd>
        </dl>

        <menu class="GameItem_Menu">
          <menuitem class="GameItem_MenuItem">
            {Name.isEditMode ? (
              <>
                <Icon
                  type="cancel"
                  exClass="GameItem_Cancel"
                  margin="top"
                  onClick={Name.cancel}
                />
                <Icon type="done" exClass="GameItem_Save" onClick={Name.save} />
              </>
            ) : (
              <Icon type="edit" onClick={Name.edit} />
            )}
          </menuitem>
        </menu>
      </div>
    </>
  );
}
