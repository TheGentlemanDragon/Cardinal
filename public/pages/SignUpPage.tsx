import styles from "./styles.module.css";

import ButtonSignUp from "../features/SignUp/ButtonSignUp";
import InputEmail from "../features/SignUp/InputEmail";
import InputPassword from "../features/SignUp/InputPassword";
import InputUsername from "../features/SignUp/InputUsername";

/** List games for the main page */
export default function SignUpPage() {
  return (
    <div class={`container ${styles.main}`}>
      <div class={`columns ${styles.signup}`}>
        <div className="column col-4 col-mx-auto">
          <div class="card">
            <div className="card-header">
              <div className="card-title h5">Sign Up</div>
              <div class="card-subtitle text-gray">
                Create a Cardinal account
              </div>
            </div>

            <div class="card-body">
              <InputEmail />

              <InputUsername />

              <InputPassword />
            </div>

            <div class="card-footer">
              <ButtonSignUp />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
