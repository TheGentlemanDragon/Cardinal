import { userSignal } from "../lib/user";

export default function Navbar() {
  const user = userSignal.value;

  if (!user.authed) {
    return null;
  }

  return (
    <header class="navbar p-2">
      <section class="navbar-section">
        <a href="#" class="navbar-brand ml-2">
          Cardinal
        </a>
      </section>

      <section class="navbar-section">
        <a class="btn btn-link" href="/">
          Projects
        </a>
        <a class="btn btn-link" href="/assets">
          Assets
        </a>
        <a class="btn btn-link" href="/recent">
          Recent
        </a>
      </section>
    </header>
  );
}
