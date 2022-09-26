import React, { useState } from "react";
import Header from "../../common/Header";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiContact } from "../../constants/api";
import ResponseMessage from "../../common/ResponseMessage";

const schema = yup.object().shape({
  name: yup.string().required("Please enter your first name").min(3, "Minimum 3 characters"),
  email: yup.string().email().required("Please enter your email"),
  subject: yup.string().required("Enter a subject").min(3, "Minimum 3 characters"),
  message: yup.string().required("Write a message").min(10, "Minimum 10 characters"),
});

function Contact() {
  const [responseMessage, setResponseMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(input) {
    setResponseMessage(null);
    setLoading(true);
    let data = JSON.stringify({
      data: { name: input.name, email: input.email, subject: input.subject, message: input.message },
    });
    console.log(data);
    const options = {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(apiContact, options);
      if (response.ok) {
        reset();
        setResponseMessage({ response: "success", message: `Thank you for your message, ${input.name}` });
      } else {
        setResponseMessage({ response: "error", message: `Oh no, ${input.name}! Something wrong happened!` });
      }
    } catch (error) {
      setResponseMessage({ response: "error", message: `Oh no, ${input.name}!:( Error: ${error}` });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <div className="enquiries__background"></div>
      <Header type="main" header="Contact" />
      {responseMessage && <ResponseMessage type={responseMessage.response} message={responseMessage.message} />}
      <form className="form contact" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__input--wrapper">
          <label htmlFor="name">Name</label>
          <input className="input" id="name" type="text" {...register("name")} />
          {errors.name && <span className="error-input">{errors.name.message}</span>}
        </div>
        <div className="form__input--wrapper">
          <label htmlFor="email"> Email</label>
          <input className="input" id="email" type="email" {...register("email")} />
          {errors.email && <span className="error-input">{errors.email.message}</span>}
        </div>
        <div className="form__input--wrapper">
          <label htmlFor="subject">Subject</label>
          <input className="input" id="subject" type="text" {...register("subject")} />
          {errors.subject && <span className="error-input">{errors.subject.message}</span>}
        </div>
        <div className="form__input--wrapper">
          <label htmlFor="message">Message</label>
          <textarea className="input" id="message" {...register("message")} rows="5" />
          {errors.message && <span className="error-input">{errors.message.message}</span>}
        </div>
        <button type="submit" className="cta">
          {loading ? "Submitting.." : "Submit"}
        </button>
      </form>
    </main>
  );
}

export default Contact;
