import { useEffect } from "preact/hooks";

export const useClickBackground = (callback: () => void) => {
  const executeCallback = (event: Event) => {
    const target = event.target as HTMLElement;
    if (target.nodeName === "MAIN") {
      callback();
    }
  };

  useEffect(() => {
    document.addEventListener("click", executeCallback);
    return () => document.removeEventListener("click", executeCallback);
  }, []);
};
