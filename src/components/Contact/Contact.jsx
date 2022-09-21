import React from "react";
import Header from "../../common/Header";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiContact } from "../../constants/api";
const schema = yup.object().shape({
  name: yup.string().required("Please enter your first name").min(3, "Minimum 3 characters"),
  email: yup.string().email().required("Please enter your email"),
  subject: yup.string().required("Enter a subject").min(3, "Minimum 3 characters"),
  message: yup.string().required("Write a message").min(10, "Minimum 10 characters"),
});

function Contact() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(input) {
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
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <Header type="main" header="Contact" />
      <form className="form contact" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__input--wrapper">
          <label>Name</label>
          <input type="text" {...register("name")} />
          {errors.name && <span className="error-input">{errors.name.message}</span>}
        </div>
        <div className="form__input--wrapper">
          <label> Email</label>
          <input type="email" {...register("email")} />
          {errors.email && <span className="error-input">{errors.email.message}</span>}
        </div>
        <div className="form__input--wrapper">
          <label>Subject</label>
          <input type="text" {...register("subject")} />
          {errors.subject && <span className="error-input">{errors.subject.message}</span>}
        </div>
        <div className="form__input--wrapper">
          <label>Message</label>
          <textarea {...register("message")} rows="5" />
          {errors.message && <span className="error-input">{errors.message.message}</span>}
        </div>
        <button type="submit" className="cta">
          Submit
        </button>
      </form>
    </main>
  );
}

export default Contact;
