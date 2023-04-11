import styles from "./HomePage.module.css";

/** Show welcome message and login/signup options */
export default function HomePage() {
  return (
    <div class={styles.page}>
      <h1>Cardinal</h1>

      <h3 class="text-bold">Make your card game a reality</h3>

      <p class="text-muted">
        Cardinal is one of the easiest ways to get the card game you have in
        your head out on to the table top.
      </p>

      <div class="columns">
        <div class="column col-2 col-ml-auto">
          <a href="/login" class="btn btn-primary btn-lg btn-block">
            Login
          </a>
        </div>
        <div class="column col-2 col-mr-auto">
          <a href="/signup" class="btn btn-link btn-lg btn-block">
            Sign up for free
          </a>
        </div>
      </div>
    </div>
  );
}
