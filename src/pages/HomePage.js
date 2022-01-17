import { h } from "preact";
import { css } from "linaria";

import { GameItem } from "../features/GameItem";
import { Title } from "../features/Title";
import { Flex } from "../features/UI/Flex";
import { Stores, useDataMutation, useDataQuery } from "../hooks/useDataQuery";
import { sortByKey } from "../lib/utils";

const HomePageCss = css`
  display: flex;
  flex-direction: column;
  height: 100vh;
  padding: 0 20px;
  width: 640px;
`;

const initialData = [];

/** List games for the main page */
export function HomePage() {
  const { mutate: addGame } = useDataMutation(Stores.Games);
  const { data: games } = useDataQuery(Stores.Games, null);

  const addGameData = () => {
    const count = document.getElementsByClassName("game").length;
    addGame({ name: `Game ${count}` });
  };

  return (
    <div class={HomePageCss}>
      <Title />

      <Flex justify="space-between">
        <h2>Games</h2>
        <button onClick={addGameData}>Add</button>
      </Flex>

      {/* Games List */}
      {games.sort(sortByKey("name")).map((game) => (
        <GameItem game={game} />
      ))}
    </div>
  );
}
