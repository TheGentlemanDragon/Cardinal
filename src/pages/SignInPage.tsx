import { KeyIcon, UserIcon } from "$icons";
import {
  error,
  INPUT_ICON_CLS,
  isSignInIncomplete,
  login,
  name,
  pass1,
  preventDefault,
  reset,
  updateFormState,
  validateInput,
} from "$lib";

import { FormHint } from "../features/FormHint";

/** User sign in */
const SignInPage = () => {
  const hasError = !!error.value.message;

  const hasNameError =
    hasError && error.value.id === "name" ? "input-error" : "";
  const hasPass1Error =
    hasError && error.value.id === "pass1" ? "input-error" : "";

  return (
    <main class="main-bg size-full flex items-center justify-center">
      <section className="card w-96 shadow-xl" data-theme="corporate">
        <form
          class="card-body"
          onBlur={validateInput}
          onFocus={reset}
          onInput={updateFormState}
          onSubmit={preventDefault}
        >
          <h2 class="card-title">Sign In</h2>

          {/* Username */}
          <label class="relative">
            <input
              class={`input ${hasNameError}`}
              id="name"
              minLength={3}
              placeholder="username"
              required
              type="text"
              value={name.value}
            />

            <UserIcon cls={INPUT_ICON_CLS} />
          </label>

          {/* Password */}
          <label class="relative">
            <input
              class={`input ${hasPass1Error}`}
              id="pass1"
              minLength={8}
              placeholder="password"
              required
              type="password"
              value={pass1.value}
            />

            <KeyIcon cls={INPUT_ICON_CLS} />
          </label>

          <FormHint signin />

          <div class="card-actions justify-center">
            <button
              class="btn"
              disabled={isSignInIncomplete.value || !!error.value.message}
              onClick={login}
            >
              Submit
            </button>

            <a href="/signup" class="btn btn-link">
              Sign Up
            </a>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignInPage;
