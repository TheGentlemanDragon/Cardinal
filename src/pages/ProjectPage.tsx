import { Page } from "../components/Page";
import { Navbar } from "../features/Navbar";
import { TemplateList } from "../features/templates/TemplateList";

/** List project resources */
const ProjectPage = () => {
  return (
    <Page>
      <Navbar />

      <section class="grid grid-cols-5 gap-y-5 gap-x-32 mx-auto max-w-screen-md pt-14">
        <TemplateList />
      </section>
    </Page>
  );
};

export default ProjectPage;
