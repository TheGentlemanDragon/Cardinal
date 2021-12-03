import { useRef, useEffect } from "preact/hooks";

export function useSelectOnFocus() {
  const selectRef = useRef(null);

  const trySelect = (event) => {
    selectRef.current.select();
  };

  useEffect(() => {
    if (!selectRef.current) {
      return;
    }

    selectRef.current.addEventListener("focus", trySelect);
    return () => selectRef.current.removeEventListener("focus", trySelect);
  }, [selectRef.current]);

  return selectRef;
}
