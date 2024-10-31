import { Navbar } from "../features/Navbar";
import { TemplateList } from "../features/templates/TemplateList";

/** List project resources */
const ProjectPage = () => {
  return (
    <main class="main-bg size-full">
      <Navbar />

      <section class="grid grid-cols-3 gap-5 mx-auto max-w-screen-md pt-14">
        <TemplateList />
      </section>
    </main>
  );
};

export default ProjectPage;
