import React, { useContext, useState } from "react";
import Header from "../../../common/Header";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiHotels } from "../../../constants/api";
import AuthContext from "../../../context/AuthContext";
import ResponseMessage from "../../../common/ResponseMessage";
import Head from "../../../common/Head";
import AddHotelForm from "./AddHotelForm";

const schema = yup.object().shape({
  name: yup.string().required("Enter hotel name").min(5, "Minimum 5 characters"),
  price: yup.number().integer().typeError("Enter price"),
  distance: yup.number().typeError("Distance to DT"),
  about: yup.string().required("Write about the hotel").min(20, "Minimum 20 characters"),
  facilities: yup.string().required("Write about the facilities").min(10, "Minimum 10 characters"),
  images: yup.mixed().test("Required", "Select image(s)", (images) => {
    return images.length > 0 ? true : false;
  }),
});

function AddHotelPage() {
  const [responseMessage, setResponseMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const user = useContext(AuthContext)[0];
  const {
    setValue,
    getValues,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(input) {
    setLoading(true);
    setResponseMessage(null);
    let formData = new FormData();
    Array.from(input.images).forEach((image) => {
      console.log(image);
      formData.append("files.images", image, image.name);
    });

    const data = JSON.stringify({
      name: input.name,
      price: input.price,
      about: input.about,
      facilities: input.facilities,
      distance: input.distance,
    });
    formData.append("data", data);

    const options = {
      method: "POST",
      body: formData,
      headers: {
        Authorization: `Bearer ${user.jwt} `,
      },
    };
    try {
      const response = await fetch(apiHotels, options);
      if (response.ok) {
        reset();
        setResponseMessage({ response: "success", message: `There you go, added accommodation: ${input.name}` });
      } else {
        setResponseMessage({ response: "error", message: `Oh no! :( An error occured!` });
      }
    } catch (error) {
      setResponseMessage({ response: "error", message: `Oh no! :( Following error occured: ${error}` });
    } finally {
      setLoading(false);
    }
  }

  return (
    <main>
      <Head title="Add Accommodation" description="Add a new accommodation to this website" addPostFixTitle={true} />
      <div className="enquiries__background"></div>
      <Header type="main" header="Add Hotel" />
      {responseMessage && <ResponseMessage type={responseMessage.response} message={responseMessage.message} />}
      <AddHotelForm setValue={setValue} getValues={getValues} register={register} errors={errors} handleSubmit={handleSubmit} onSubmit={onSubmit} loading={loading} />
    </main>
  );
}
export default AddHotelPage;
