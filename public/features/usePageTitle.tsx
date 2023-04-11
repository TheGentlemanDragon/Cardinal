import { useEffect } from "preact/hooks";

export default function usePageTitle(title: string) {
  useEffect(() => {
    document.title = title;
  }, []);
}
