import React, { useContext, useState } from "react";
import Header from "../../common/Header";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiHotels } from "../../constants/api";
import AuthContext from "../../context/AuthContext";
import ResponseMessage from "../../common/ResponseMessage";

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
  const [imageList, setImageList] = useState([]);
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
  function preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files.length > 0) {
      const files = event.dataTransfer.files;
      setValue("images", files);
      setImageList(event.dataTransfer.files);
    }
  }

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
      <div className="enquiries__background"></div>
      <Header type="main" header="Add Hotel" />
      {responseMessage && <ResponseMessage type={responseMessage.response} message={responseMessage.message} />}
      <form className="form add-hotel" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__input--wrapper">
          <label htmlFor="hotel">Hotel Name</label>
          <input className="input" id="hotel" {...register("name")} type="text" />
          {errors.name && <span className="error-input">{errors.name.message}</span>}
        </div>
        <div className="form__small-input--wrapper ">
          <div className="form__input--wrapper">
            <label htmlFor="price">Price</label>
            <input className="input" id="price" {...register("price")} type="number" />
            {errors.price && <span className="error-input">{errors.price.message}</span>}
          </div>
          <div className="form__input--wrapper">
            <label htmlFor="distance">Distance</label>
            <input className="input" id="distance" {...register("distance")} type="number" step="0.01" />
            {errors.distance && <span className="error-input">{errors.distance.message}</span>}
          </div>
        </div>
        <div className="form__input--wrapper">
          <label htmlFor="about">About</label>
          <textarea className="input" id="about" {...register("about")} rows="5" />
          {errors.about && <span className="error-input">{errors.about.message}</span>}
        </div>
        <div className="form__input--wrapper">
          <label htmlFor="facilities">Facilities</label>
          <textarea className="input" id="facilities" {...register("facilities")} rows="5" />
          {errors.facilities && <span className="error-input">{errors.facilities.message}</span>}
        </div>
        <div className="form__input--wrapper">
          <label
            className="image__uploader"
            htmlFor="input__image"
            onDragEnter={(e) => {
              preventDefaults(e);
              e.target.classList.add("highlight");
            }}
            onDragOver={(e) => {
              preventDefaults(e);
              console.log(e.target.classList);
              e.target.classList.add("highlight");
            }}
            onDrop={(e) => {
              preventDefaults(e);
              e.target.classList.remove("highlight");
            }}
            onDragLeave={(e) => {
              preventDefaults(e);
              e.target.classList.remove("highlight");
            }}
          >
            {imageList.length ? "You have selected: " + imageList.length + " image(s)" : "Drag 'n' drop some images here, or click to select them"}
          </label>
          <input
            className="input image-input"
            id="input__image"
            {...register("images", {
              onChange: () => {
                setImageList(getValues("images"));
              },
            })}
            type="file"
            accept="image/png, image/jpeg"
            multiple
          />
          {errors.images && <span className="error-input">{errors.images.message}</span>}
        </div>
        <button type="submit" className="cta">
          {loading ? "adding.." : "Add Hotel"}
        </button>
      </form>
    </main>
  );
}
export default AddHotelPage;
