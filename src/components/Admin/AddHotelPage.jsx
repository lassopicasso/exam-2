import React, { useContext } from "react";
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
  images: yup.mixed().required("Image is required"),
});

function AddHotelPage() {
  const user = useContext(AuthContext)[0];
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  async function onSubmit(input) {
    const images = input.images;
    let formData = new FormData();

    Array.from(images).forEach((image) => {
      console.log(image);
      formData.append("data.images", image, image.name);
    });

    const data = JSON.stringify({
      data: {
        name: input.name,
        price: input.price,
        about: input.about,
        facilities: input.facilities,
        distance: input.distance,
      },
    });
    formData.append("data", data);

    const options = {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
        // "Content-Type": "application/json",
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
        <div>
          <label>Hotel Name</label>
          <input {...register("name")} type="text" />
          {errors.name && <span className="error-input">{errors.name.message}</span>}
        </div>
        <div className="add-hotel__small--input">
          <div>
            <label>Price</label>
            <input {...register("price")} type="number" />
            {errors.price && <span className="error-input">{errors.price.message}</span>}
          </div>
          <div>
            <label>Distance</label>
            <input {...register("distance")} type="number" step="0.01" />
            {errors.distance && <span className="error-input">{errors.distance.message}</span>}
          </div>
        </div>
        <div>
          <label>About</label>
          <textarea {...register("about")} rows="5" />
          {errors.about && <span className="error-input">{errors.about.message}</span>}
        </div>
        <div>
          <label>Facilities</label>
          <textarea {...register("facilities")} rows="5" />
          {errors.facilities && <span className="error-input">{errors.facilities.message}</span>}
        </div>
        <div>
          <label>Images</label>
          <input {...register("images")} type="file" id="image" className="image-input" accept="image/png, image/jpeg" multiple />
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
