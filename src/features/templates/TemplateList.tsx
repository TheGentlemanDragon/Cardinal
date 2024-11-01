import { useRoute } from "preact-iso";

import { EmptyState, QueryStatus } from "$components";
import {
  isEmptyError,
  TITLE_CLS,
  useTemplates,
  type PbList,
  type Template,
} from "$lib";

import { TemplateCard } from "./TemplateCard";
import { TemplatesLoading } from "./TemplatesLoading";

/** List all templates in a project */
export const TemplateList = () => {
  const route = useRoute();
  // const projectId = route.params.id;

  const templatesQuery = useTemplates();
  const { data: templates, error } = templatesQuery;

  return (
    <>
      <div class="col-span-3 flex justify-between">
        <div class={TITLE_CLS}>Templates</div>
        {/* <CreateTemplateModalButton /> */}
      </div>

      <QueryStatus
        query={templatesQuery}
        isEmpty={(data: PbList<Template>) =>
          isEmptyError(error) || data.items.length === 0
        }
      >
        <QueryStatus.Loading>
          <TemplatesLoading />
        </QueryStatus.Loading>

        <QueryStatus.Error>Error!</QueryStatus.Error>

        <QueryStatus.Empty>
          <EmptyState title="Create a template">
            Templates are blueprints for cards consisting of static or dynamic
            text and/or images. You currently do not have any templates in this
            project. Click the + button to create one.
          </EmptyState>
        </QueryStatus.Empty>

        <QueryStatus.Success>
          {templates?.items.map((project) => (
            <TemplateCard project={project} />
          ))}
        </QueryStatus.Success>
      </QueryStatus>
    </>
  );
};
