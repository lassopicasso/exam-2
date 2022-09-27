import React, { useContext, useState, useEffect } from "react";
import { apiAuth } from "../../constants/api";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import AuthContext from "../../context/AuthContext";
import ResponseMessage from "../../common/ResponseMessage";
import Header from "../../common/Header";
import Head from "../../common/Head";

const schema = yup.object().shape({
  email: yup.string().email().required("Please enter your email"),
  password: yup.string().required("Please enter your password").min(5, "Minimum 5 characters"),
});
function Login() {
  const [auth, setAuth] = useContext(AuthContext);
  const [responseMessage, setResponseMessage] = useState(null);
  const [loading, setLoading] = useState(false);
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
    setLoading(true);
    setResponseMessage(null);
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
      if (!response.ok) {
        setResponseMessage({ response: "error", message: `Oh no! :( Something wrong occurred!` });
      }
      const json = await response.json();
      if (json.user) {
        setAuth(json);
      } else {
        setResponseMessage({ response: "error", message: `The email or password is incorrect` });
      }
    } catch (error) {
      setResponseMessage({ response: "error", message: `Oh no! :( Error occured: ${error}` });
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Head title="Login" description="Login as a admin or a user where you can read messages/enquiries and add new hotels if you are admin." addPostFixTitle={true} />
      <div className="enquiries__background"></div>
      <div className="login">
        <Header type="main" header="Login" />
        {responseMessage && <ResponseMessage type={responseMessage.response} message={responseMessage.message} />}
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__input--wrapper">
            <label htmlFor="email">Email: </label>
            <input className="input" {...register("email")} type="email" id="email" />
            {errors.email && <span className="error-input">{errors.email.message}</span>}
          </div>
          <div className="form__input--wrapper">
            <label htmlFor="password">Password:</label>
            <input className="input" {...register("password")} type="password" id="password" />
            {errors.password && <span className="error-input">{errors.password.message}</span>}
          </div>
          <button type="submit" className="btn cta">
            {loading ? "Logging in.." : "Login"}
          </button>
        </form>
      </div>
    </>
  );
}

export default Login;
