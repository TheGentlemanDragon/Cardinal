import { Signal, signal } from "@preact/signals";
import { TargetedEvent } from "preact/compat";

export const EMAIL_EXISTS_MSG =
  "This email is already in use. Would you like to retrieve your token?";

export interface InputState {
  error: string;
  isValid: boolean;
  value: string;
}

export const defaultInput: InputState = {
  error: "",
  isValid: false,
  value: "",
};

export const emailSignal = signal({ ...defaultInput });
export const nameSignal = signal({ ...defaultInput });
export const passwordSignal = signal({ ...defaultInput });
export const confirmPasswordSignal = signal({ ...defaultInput });

const inputSignalMap: Record<string, Signal> = {
  email: emailSignal,
  password: passwordSignal,
  text: nameSignal,
};

export const validatePassword = (
  event: TargetedEvent<HTMLInputElement, Event>,
) => {
  const input = event.currentTarget;

  if (input === null || !(input instanceof HTMLInputElement)) {
    return;
  }

  if (input.value != passwordSignal.value.value) {
    passwordSignal.value = {
      ...passwordSignal.value,
      error: "Passwords do not match",
    };
  }
};

export const fullValidate = async (
  event: TargetedEvent<HTMLInputElement, Event>,
) => {
  const input = event.currentTarget;

  if (input === null || !(input instanceof HTMLInputElement)) {
    return;
  }

  const value = input.value;
  const isValid = input.checkValidity();
  const state = inputSignalMap[input.type];

  let error = input.validationMessage;

  // Don't check if user exists until all other validations addressed
  if (!isValid) {
    state.value = { error, isValid, value };
    return;
  }

  // TODO: Implement user lib
  // const key = input.type === "email" ? "email" : "name";
  // const exists = await userExists({ [key]: value });

  const exists = false;

  if (!exists) {
    state.value = { error: "", isValid, value };
    return;
  }

  error = input.type === "email"
    ? EMAIL_EXISTS_MSG
    : "Sorry. That name is unavailable";

  state.value = { error, isValid: false, value };
};

export const partialValidate = (
  event: TargetedEvent<HTMLInputElement, Event>,
) => {
  const input = event.currentTarget;

  if (input === null || !(input instanceof HTMLInputElement)) {
    return;
  }

  const value = input.value;
  const isValid = input.checkValidity();
  const state = inputSignalMap[input.type];

  state.value = { error: "", isValid, value };
};

export const preventSubmit = [emailSignal.value, nameSignal.value].some(
  (item) => !item.isValid || !item.value,
);

export const reset = (event: TargetedEvent<HTMLInputElement, Event>) => {
  const input = event.currentTarget;

  if (input === null || !(input instanceof HTMLInputElement)) {
    return;
  }

  const state = inputSignalMap[input.type];

  if (state.value.error) {
    state.value = { ...state.value, error: "" };
  }
};
