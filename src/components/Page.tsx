import { ReactNode } from "preact/compat";

type PageProps = {
  children: ReactNode;
};

/**
 * Page component
 *
 * Applies background, full-page layout, and flex column
 */
export const Page = ({ children }: PageProps) => {
  return <main class="main-bg size-full flex flex-col">{children}</main>;
};
