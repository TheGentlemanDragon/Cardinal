// import styles from './style.module.css';

import {
  CreateProjectButton,
  CreateProjectModal,
} from "../features/modals/CreateProjectModal";

/** List projects for the main page */
const ProjectsPage = () => {
  // const { data: games } = useCollectionQuery(Stores.Games);
  // const { mutate: addGame } = useAddMutation(Stores.Games);

  // const addGameData = () => {
  //   const count = document.getElementsByClassName("game").length;
  //   addGame({ name: `Game ${count}` });
  // };

  return (
    <section>
      <div class="grid">
        <div style="justify-self: flex-end;">
          <CreateProjectButton />
        </div>
      </div>

      <div class="grid">
        {/* {games.sort(sortByKey("name")).map((game) => ( */}
        <article>I'm a card!</article>
        <article>I'm a card!</article>
        <article>I'm a card!</article>
        {/*}
        <GameItem game={game} />
				))} */}
      </div>

      <CreateProjectModal />
    </section>
  );
};

export default ProjectsPage;
