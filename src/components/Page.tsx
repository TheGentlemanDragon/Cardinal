import { ReactNode } from "preact/compat";

type PageProps = {
  children: ReactNode;
};

/**
 * Page component
 *
 * Applies background and full-page layout
 */
export const Page = ({ children }: PageProps) => {
  return <main class="main-bg size-full">{children}</main>;
};
