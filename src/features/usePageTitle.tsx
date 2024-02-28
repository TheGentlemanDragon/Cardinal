import { useEffect } from "preact/hooks";

export const usePageTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, []);
};
