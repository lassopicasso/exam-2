import React, { useContext, useState, useEffect } from "react";
import { apiAuth } from "../../constants/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthContext from "../../context/AuthContext";

const schema = yup.object().shape({
  email: yup.string().required("Please enter your email"),
  password: yup.string().required("Please enter your password").min(5, "Minimum 5 characters"),
});
function Login() {
  const [auth, setAuth] = useContext(AuthContext);
  const [loginFailed, setLoginFailed] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  const navigate = useNavigate();
  useEffect(() => {
    console.log(auth);
    if (auth) {
      navigate("/messages");
    }
    // eslint-disable-next-line
  }, [auth]);

  async function onSubmit(input) {
    // event.preventDefault();
    let data = JSON.stringify({
      identifier: input.email,
      password: input.password,
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
      console.log(json);
      if (json.user) {
        setLoginFailed(false);
        setAuth(json);
      } else {
        setLoginFailed(true);
      }
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      <div className="login">
        <h1>Login</h1>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          {loginFailed && <div className="login__error--login">The email or password is invalid. Please try again.</div>}
          <div className="form__input--wrapper">
            <label className="login__label">Email: </label>
            <input className="input" {...register("email")} type="email" id="email" />
            {errors.email && <span className="error-input">{errors.email.message}</span>}
          </div>
          <div className="form__input--wrapper">
            <label className="login__label">Password:</label>
            <input className="input" {...register("password")} type="password" id="password" />
            {errors.password && <span className="error-input">{errors.password.message}</span>}
          </div>
          <button type="submit" className="btn cta">
            Login
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
