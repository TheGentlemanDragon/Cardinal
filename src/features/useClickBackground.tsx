import { useEffect } from "preact/hooks";

export const useClickBackground = (callback: () => void) => {
  const executeCallback = (event: Event) => {
    if (event.target === event.currentTarget) {
      callback();
    }
  };

  useEffect(() => {
    document.querySelector("main").addEventListener("click", executeCallback);

    return () =>
      document
        .querySelector("main")
        .removeEventListener("click", executeCallback);
  }, []);
};
