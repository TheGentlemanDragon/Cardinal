import { useRoute } from "preact-iso";
import { Navbar } from "../features/Navbar";

/** List project resources */
const ProjectPage = () => {
  const route = useRoute();

  return (
    <main class="main-bg size-full">
      <Navbar />
      Page for Project {route.params.id}
    </main>
  );
};

export default ProjectPage;
