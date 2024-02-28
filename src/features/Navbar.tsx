import { userSignal } from "../lib/user";

export const Navbar = () => {
  const user = userSignal.value;

  if (!user.authed) {
    return null;
  }

  return (
    <header>
      <nav>
        <section>
          <a href="#">Cardinal</a>
        </section>

        <section>
          <a href="/">Projects</a>
          <a href="/assets">Assets</a>
          <a href="/recent">Recent</a>
        </section>
      </nav>
    </header>
  );
};
