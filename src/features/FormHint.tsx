import { useActiveElement } from "@react-hooks-library/core";

import { error, isSignInIncomplete, isSignUpIncomplete } from "$lib";

type Props = {
  signin?: boolean;
};

const messageMap = {
  default: "Complete the form to create an account.",
  signin: "Complete the form to sign in.",
  email: "Please enter a valid email address.",
  name: "Please select a username.",
  pass1: "Please enter a password.",
  pass2: "Please confirm your password.",
  complete: "All set!",
} as const;

type ElementId = keyof typeof messageMap;

export const FormHint = ({ signin }: Props) => {
  const { activeElement } = useActiveElement();

  let elementId =
    (activeElement?.id as ElementId) || (signin ? "signin" : "default");

  if (
    elementId === "default" &&
    (!isSignUpIncomplete.value || !isSignInIncomplete.value) &&
    !error.value.message
  ) {
    elementId = "complete";
  }
  const message = messageMap[elementId];

  return (
    <p class={`form-input-hint ${error.value.message ? "text-error" : ""}`}>
      {error.value.message || message}
    </p>
  );
};
