import {
  LocationProvider,
  Router,
  Route,
  lazy,
  ErrorBoundary,
  hydrate,
  prerender as ssr,
} from "preact-iso";
import usePageTitle from "./features/usePageTitle";
import Navbar from "./features/Navbar";
import NotFound from "./pages/_404";

import "./assets/spectre.min.css";

// const AboutPage = lazy(() => import("./pages/AboutPage"));
const HomePage = lazy(() => import("./pages/HomePage"));
// const LoginPage = lazy(() => import("./pages/LoginPage"));
// const ProjectsPage = lazy(() => import("./pages/ProjectsPage"));
// const SignUpPage = lazy(() => import("./pages/SignUpPage"));

export function App() {
  usePageTitle("Cardinal");

  return (
    <LocationProvider>
      <Navbar />

      <ErrorBoundary>
        <Router>
          <Route path="/" component={HomePage} />
          {/* <Route path="/signup" component={SignUpPage} /> */}
          {/* <Route path="/login" component={LoginPage} /> */}
          {/* <Route path="/about" component={AboutPage} /> */}
          <Route default component={NotFound} />
        </Router>
      </ErrorBoundary>
    </LocationProvider>
  );
}

hydrate(<App />);

export async function prerender() {
  return await ssr(<App />);
}
