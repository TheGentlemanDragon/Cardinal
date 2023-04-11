import { h } from "preact";
import { useEffect, useRef, useState } from "preact/hooks";

// TODO: Refactor to allow temporary value or backup previous Value
export function useEditableValue({ initial, saveOnBlur, onSave }) {
  const [state, setState] = useState({ value: initial, isEditMode: false });
  const { value, isEditMode } = state;
  const input = useRef(null);

  const focus = () => {
    input.current.focus();
    input.current.select();
  };

  useEffect(() => {
    if (!isEditMode) {
      return;
    }

    focus();
  }, [isEditMode]);

  const edit = () => setState({ value, isEditMode: true });

  const cancel = () => setState({ value, isEditMode: false });

  const save = () => {
    if (onSave(input.current.value)) {
      focus();
      // TODO: Add error notification
      return;
    }

    setState({ value: input.current.value, isEditMode: false });
  };

  const checkKeyDown = (event) => {
    if (event.key === "Enter") {
      save(event.target.value);
    } else if (event.key === "Escape") {
      cancel();
    }
  };

  return {
    Node: isEditMode ? (
      <input
        type="text"
        ref={input}
        value={state.value}
        onKeyDown={checkKeyDown}
        onBlur={saveOnBlur ? save : null}
      />
    ) : (
      value
    ),
    cancel,
    edit,
    isEditMode,
    save,
  };
}
