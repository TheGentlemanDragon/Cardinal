// import { hydrate, prerender as ssr } from "preact-iso";

import { QueryClientProvider } from "@tanstack/react-query";
import { render } from "preact";
import {
  ErrorBoundary,
  lazy,
  LocationProvider,
  Router,
  Route,
} from "preact-iso";
import { usePageTitle } from "./features/usePageTitle";
import { queryClient } from "./lib/db";
import "./styles.css";

const Splash = lazy(() => import("./pages/SplashPage"));
const SignUp = lazy(() => import("./pages/SignUpPage"));
const SignIn = lazy(() => import("./pages/SignInPage"));
const Project = lazy(() => import("./pages/ProjectPage"));
const Projects = lazy(() => import("./pages/ProjectsPage"));
const NotFound = lazy(() => import("./pages/NotFoundPage"));

const App = () => {
  usePageTitle("Cardinal");

  return (
    <QueryClientProvider client={queryClient}>
      <LocationProvider>
        <ErrorBoundary>
          <Router>
            <Route path="/" component={Splash} />
            <Route path="/signup" component={SignUp} />
            <Route path="/signin" component={SignIn} />
            <Route path="/projects/:id" component={Project} />
            <Route path="/projects" component={Projects} />

            <NotFound default />
          </Router>
        </ErrorBoundary>
      </LocationProvider>
    </QueryClientProvider>
  );
};

export default App;

render(<App />, document.getElementById("app")!);

// hydrate(<App />);

// export async function prerender() {
//   return await ssr(<App />);
// }
