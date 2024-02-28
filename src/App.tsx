// import { hydrate, prerender as ssr } from "preact-iso";

import { render } from "preact";
import { ErrorBoundary, lazy, LocationProvider, Router } from "preact-iso";
import { Navbar } from "./features/Navbar";
import { usePageTitle } from "./features/usePageTitle";
import "./styles.css";

const Splash = lazy(() => import("./pages/SplashPage"));
const SignUp = lazy(() => import("./pages/SignUpPage"));
const SignIn = lazy(() => import("./pages/SignInPage"));
const Projects = lazy(() => import("./pages/ProjectsPage"));

const NotFound = lazy(() => import("./pages/_404"));

const App = () => {
  usePageTitle("Cardinal");

  return (
    <LocationProvider>
      <Navbar />

      <ErrorBoundary>
        <Router>
          <Splash path="/" />
          <SignUp path="/signup" />
          <SignIn path="/signin" />
          <Projects path="/projects" />

          <NotFound default />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
};

export default App;

render(<App />, document.getElementById("app")!);

// hydrate(<App />);

// export async function prerender() {
//   return await ssr(<App />);
// }
