import React from "react";
import { apiAuth } from "../../constants/api";

function Login() {
  function checkInput(event) {
    event.preventDefault();
    const email = document.querySelector("#email").value;
    const password = document.querySelector("#password").value;
    async function login() {
      let data = JSON.stringify({
        identifier: email,
        password: password,
      });
      const options = {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await fetch(apiAuth, options);
        const json = await response.json();

        console.log(json.user);
      } catch (error) {
        console.log(error);
      }
      console.log(data);
      console.log(options);
    }
    login();
  }

  return (
    <>
      <div className="form__container">
        <h1>Login</h1>
        <div className="form__error-message"></div>
        <form>
          <label htmlFor="email" className="label-email">
            Email:
          </label>
          <input type="text" id="email" />
          <p className="email-error input-error">Format: "example@example.com"</p>
          <label htmlFor="password" className="label-password">
            Password:
          </label>
          <input type="password" id="password" />
          <p className="password-error input-error">Minimum 3 characters</p>

          <button type="submit" className="btn cta" onClick={(event) => checkInput(event)}>
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
