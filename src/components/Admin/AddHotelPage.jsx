import React, { useContext, useState } from "react";
import Header from "../../common/Header";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { apiHotels } from "../../constants/api";
import AuthContext from "../../context/AuthContext";

const schema = yup.object().shape({
  name: yup.string().required("Enter hotel name").min(5, "Minimum 5 characters"),
  price: yup.number().integer().typeError("Enter price"),
  distance: yup.number().typeError("Enter distance to downtown"),
  about: yup.string().required("Write about the hotel").min(20, "Minimum 20 characters"),
  facilities: yup.string().required("Write about the facilities").min(10, "Minimum 10 characters"),
  images: yup.mixed().test("Required", "Select image(s)", (images) => {
    return images.length > 0 ? true : false;
  }),
});

function AddHotelPage() {
  const [imageList, setImageList] = useState([]);
  const user = useContext(AuthContext)[0];
  const {
    setValue,
    getValues,
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
    console.log(input.images);
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
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <main>
      <Header type="main" header="Add Hotel" />
      <form className="form add-hotel" onSubmit={handleSubmit(onSubmit)}>
        <div className="form__input--wrapper">
          <label>Hotel Name</label>
          <input className="input" {...register("name")} type="text" />
          {errors.name && <span className="error-input">{errors.name.message}</span>}
        </div>
        <div className="form__small-input--wrapper ">
          <div className="form__input--wrapper">
            <label>Price</label>
            <input className="input" {...register("price")} type="number" />
            {errors.price && <span className="error-input">{errors.price.message}</span>}
          </div>
          <div className="form__input--wrapper">
            <label>Distance</label>
            <input className="input" {...register("distance")} type="number" step="0.01" />
            {errors.distance && <span className="error-input">{errors.distance.message}</span>}
          </div>
        </div>
        <div className="form__input--wrapper">
          <label>About</label>
          <textarea className="input" {...register("about")} rows="5" />
          {errors.about && <span className="error-input">{errors.about.message}</span>}
        </div>
        <div className="form__input--wrapper">
          <label>Facilities</label>
          <textarea className="input" {...register("facilities")} rows="5" />
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
          Add Hotel
        </button>
      </form>
    </main>
  );
}
export default AddHotelPage;
