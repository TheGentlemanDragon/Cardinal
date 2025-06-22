// import { hydrate, prerender as ssr } from "preact-iso";

import { QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { render } from "preact";
import {
  ErrorBoundary,
  lazy,
  LocationProvider,
  Router,
  Route,
} from "preact-iso";

import { queryClient } from "$lib";

import { usePageTitle } from "./features/usePageTitle";
import "./styles.css";

const NotFound = lazy(() => import("./pages/NotFoundPage"));
const Project = lazy(() => import("./pages/ProjectPage"));
const Projects = lazy(() => import("./pages/ProjectsPage"));
const SignIn = lazy(() => import("./pages/SignInPage"));
const SignUp = lazy(() => import("./pages/SignUpPage"));
const Splash = lazy(() => import("./pages/SplashPage"));
const Editor = lazy(() => import("./pages/EditorPage"));

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
            <Route path="/editor/:id" component={Editor} />

            <NotFound default />
          </Router>
        </ErrorBoundary>
      </LocationProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
};

export default App;

render(<App />, document.getElementById("app")!);

// hydrate(<App />);

// export async function prerender() {
//   return await ssr(<App />);
// }
