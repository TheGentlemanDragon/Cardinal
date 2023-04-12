import {
  confirmPasswordSignal,
  validatePassword,
  passwordSignal,
  reset,
  partialValidate,
  fullValidate,
} from "./signUp";

export default function InputPassword() {
  const confirmPassword = confirmPasswordSignal.value;
  const password = passwordSignal.value;
  const hasError = password.error ? "has-error" : "";

  return (
    <div class={`form-group ${hasError}`}>
      <label class="form-label" for="pass1">
        Password
      </label>

      <input
        class="form-input"
        id="pass1"
        minLength={8}
        onBlur={fullValidate}
        onChange={partialValidate}
        onFocus={reset}
        placeholder="************"
        required
        type="password"
        value={password.value}
      />

      <label class="form-label" for="pass2">
        Confirm Password
      </label>

      <input
        class="form-input"
        id="pass2"
        minLength={8}
        onBlur={validatePassword}
        onFocus={reset}
        placeholder="************"
        required
        type="password"
        value={confirmPassword.value}
      />

      <p class="form-input-hint">{password.error}</p>
    </div>
  );
}
