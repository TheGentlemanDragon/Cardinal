import {
  EMAIL_EXISTS_MSG,
  emailSignal,
  fullValidate,
  nameSignal,
  partialValidate,
  reset,
} from "./signUp";

export default function InputEmail() {
  const email = emailSignal.value;
  const name = nameSignal.value;
  const hasError = name.error ? "has-error" : "";

  if (email.error === EMAIL_EXISTS_MSG) {
    return null;
  }

  return (
    <div class={`form-group ${hasError}`}>
      <label class="form-label" for="user">
        Username
      </label>

      <input
        class="form-input"
        id="user"
        minLength={3}
        onBlur={fullValidate}
        onChange={partialValidate}
        onFocus={reset}
        required
        type="text"
        value={name.value}
      />

      <p class="form-input-hint">{name.error || ""}</p>
    </div>
  );
}
