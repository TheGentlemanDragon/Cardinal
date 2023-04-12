import { emailSignal, reset, partialValidate, fullValidate } from "./signUp";

export default function InputEmail() {
  const email = emailSignal.value;
  const hasError = email.error ? "has-error" : "";

  return (
    <div class={`form-group ${hasError}`}>
      <label class="form-label" for="email">
        Email
      </label>

      <input
        class="form-input"
        id="email"
        onBlur={fullValidate}
        onChange={partialValidate}
        onFocus={reset}
        placeholder="user@email.com"
        required
        type="email"
        value={email.value}
      />

      <p class="form-input-hint">
        {email.error || "Your email address stays private"}
      </p>
    </div>
  );
}
