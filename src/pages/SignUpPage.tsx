import { FormHint } from "../features/FormHint";
import { EmailIcon } from "../features/icons/EmailIcon";
import { UserIcon } from "../features/icons/UserIcon";
import { KeyIcon } from "../features/icons/KeyIcon";
import {
  createUser,
  email,
  error,
  isSignUpIncomplete,
  name,
  pass1,
  pass2,
  reset,
  updateFormState,
  validateInput,
} from "../lib/signUp";
import { INPUT_ICON_CLS, INPUT_CLS } from "../lib/styles";
import { preventDefault } from "../lib/utils";

/** List games for the main page */
const SignUpPage = () => {
  const hasError = !!error.value.message;

  const hasEmailError =
    hasError && error.value.id === "email" ? "input-error" : "";
  const hasNameError =
    hasError && error.value.id === "name" ? "input-error" : "";
  const hasPass1Error =
    hasError && error.value.id === "pass1" ? "input-error" : "";
  const hasPass2Error =
    hasError && error.value.id === "pass2" ? "input-error" : "";

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
          <h2 class="card-title">Sign Up</h2>
          <span>Create a Cardinal account</span>

          {/* Email */}
          <label class="relative">
            <input
              class={`${INPUT_CLS} ${hasEmailError}`}
              id="email"
              minLength={3}
              placeholder="user@email.com"
              required
              type="email"
              value={email.value}
            />

            <EmailIcon cls={INPUT_ICON_CLS} />
          </label>

          {/* Username */}
          <label class="relative">
            <input
              class={`${INPUT_CLS} ${hasNameError}`}
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
              autocomplete="off"
              class={`${INPUT_CLS} ${hasPass1Error}`}
              id="pass1"
              minLength={8}
              placeholder="password"
              required
              type="password"
              value={pass1.value}
            />
            <KeyIcon cls={INPUT_ICON_CLS} />
          </label>

          {/* Password Confirm */}
          <label class="relative">
            <input
              autocomplete="off"
              class={`${INPUT_CLS} ${hasPass2Error}`}
              id="pass2"
              minLength={8}
              placeholder="password"
              required
              type="password"
              value={pass2.value}
            />
            <KeyIcon cls={INPUT_ICON_CLS} />
          </label>

          <FormHint />

          <div class="card-actions justify-center">
            <button
              class="btn"
              disabled={isSignUpIncomplete.value || !!error.value.message}
              onClick={createUser}
            >
              Submit
            </button>

            <a href="/signin" class="btn btn-link">
              Sign In
            </a>
          </div>
        </form>
      </section>
    </main>
  );
};

export default SignUpPage;
