import { computed, signal, Signal } from "@preact/signals";
import { TargetedEvent } from "preact/compat";

import { Collections, pb } from "./db";

///// Types ////////////////////////////////////////////////////////////////////

export interface InputState {
  error: string;
  value: string;
}

type SignupFormEvent = TargetedEvent<
  HTMLFormElement | HTMLButtonElement,
  Event
>;

///// Constants ////////////////////////////////////////////////////////////////

const USER_EXISTS_MAP = {
  email:
    "An account with this email exists. Would you like to reset your password?",
  name: "This username has been taken. Please select another.",
};

const PASSWORD_MATCH_ERROR = "Passwords do not match";

export const email = signal("");
export const name = signal("");
export const pass1 = signal("");
export const pass2 = signal("");
export const error = signal({ id: "", message: "" });

export const isSignupDisabledSignal = signal(true);

const inputSignalMap: Record<string, Signal> = { email, pass1, pass2, name };
const signupSignals = [email, name, pass1, pass2];
const signinSignals = [email, pass1];

export const isSignUpIncomplete = computed(() =>
  signupSignals.some((signal) => !signal.value)
);

export const isSignInIncomplete = computed(() =>
  signinSignals.some((signal) => !signal.value)
);

///// Public Methods ///////////////////////////////////////////////////////////

/** Create a user */
export const createUser = async (_event: SignupFormEvent) => {
  try {
    const data = {
      email: email.value,
      emailVisibility: false,
      password: pass1.value,
      passwordConfirm: pass2.value,
      name: name.value,
    };
    await Collections.Users.create(data);
    await Collections.Users.requestVerification(email.value);
    await login();
  } catch (err) {
    console.error(err);
  }
};

export const login = async () => {
  try {
    const authData = await pb
      .collection("users")
      .authWithPassword(email.value, pass1.value);

    location.assign("/projects");
  } catch (error) {
    console.log({ error });
  }
};

/** Clear error state and select input value */
export const reset = ({ target }: SignupFormEvent) => {
  if (target === null || !(target instanceof HTMLInputElement)) {
    return;
  }

  target.select && target.select();

  if (target.id === error.value.id && error.value) {
    error.value = { id: "", message: "" };
  }
};

/** Update form state; Happens on each input to check for complete form */
export const updateFormState = ({ target }: SignupFormEvent) => {
  if (target === null || !(target instanceof HTMLInputElement)) {
    return;
  }

  inputSignalMap[target.id].value = target.value;
};

/** Run input validity check and cache to state */
export const validateInput = async ({ target }: SignupFormEvent) => {
  if (target === null || !(target instanceof HTMLInputElement)) {
    return;
  }

  // Check is native validations pass
  if (!target.checkValidity()) {
    error.value = { id: target.id, message: target.validationMessage };
    return;
  }

  const state = inputSignalMap[target.id];

  // TODO: Implement user lib and "existing user" check
  if (state === email || state === name) {
    const key = target.type === "email" ? "email" : "name";
    // const value = target.value;

    if (await false) {
      // userExists({ email: value })
      error.value = { id: target.id, message: USER_EXISTS_MAP[key] };
      return;
    }
  }

  // Check passwords
  if ([pass1, pass2].includes(state) && pass1.value && pass2.value) {
    const id = state === pass1 ? "pass1" : "pass2";
    const message = pass1.value === pass2.value ? "" : PASSWORD_MATCH_ERROR;
    error.value = { id, message };
    return;
  }
};
