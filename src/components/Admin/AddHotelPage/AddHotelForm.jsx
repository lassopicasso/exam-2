import React, { useState } from "react";

function AddHotelForm({ setValue, getValues, register, errors, handleSubmit, onSubmit, loading }) {
  const [imageList, setImageList] = useState([]);
  function preventDefaults(event) {
    event.preventDefault();
    event.stopPropagation();
    if (event.dataTransfer.files.length > 0) {
      const files = event.dataTransfer.files;
      setValue("images", files);
      setImageList(event.dataTransfer.files);
    }
  }

  return (
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
        <textarea className="input" id="about" {...register("about")} rows="4" />
        {errors.about && <span className="error-input">{errors.about.message}</span>}
      </div>
      <div className="form__input--wrapper">
        <label htmlFor="facilities">Facilities</label>
        <textarea className="input" id="facilities" {...register("facilities")} rows="4" />
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
        {loading ? "Adding.." : "Add Hotel"}
      </button>
    </form>
  );
}

export default AddHotelForm;
