// import { EMAIL_EXISTS_MSG, emailSignal, preventSubmit } from "./signUp";
import { preventSubmit } from "./signUp";

export default function ButtonSignUp() {
  // const email = emailSignal.value;

  return (
    <div class="btn-group btn-group-block">
      <button
        class="btn btn-lg btn-primary"
        disabled={preventSubmit}
        onClick={() => console.log("clicked Sign up")}
      >
        Sign up
      </button>

      <button
        class="btn btn-lg btn-link"
        onClick={() => console.log("clicked Login")}
      >
        Back to login
      </button>
    </div>
  );
}
