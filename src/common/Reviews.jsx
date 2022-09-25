import React, { useEffect, useState } from "react";
import Header from "./Header";
import { apiRatings, apiHotels } from "../constants/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import moment from "moment/moment";

const schema = yup.object().shape({
  name: yup.string().required("Please enter a name").min(3, "Minimum 3 characters"),
  rating: yup.number().typeError("Enter a rating").min(1, "Minimum 1").max(10, "Maximum 10"),
  message: yup.string().required("Write a message").min(10, "Minimum 10 characters"),
});

function Reviews({ hotel, setShowReviews }) {
  const [toggleReviews, setToggleReviews] = useState(false);
  const [reviews, setReviews] = useState([]);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });
  const id = hotel.id;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  async function onSubmit(input) {
    let data = JSON.stringify({
      data: { hotel_id: id, name: input.name, message: input.message, star_rating: input.rating },
    });
    const options = {
      method: "POST",
      body: data,
      headers: {
        "Content-Type": "application/json",
      },
    };
    try {
      const response = await fetch(apiRatings, options);
      if (response.ok) {
        setToggleReviews(!toggleReviews);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    async function fetchReviews() {
      const apiUrl = apiRatings + "?pagination[pageSize]=100&populate=*";
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          console.log(data.data);
          //Sort Reviews
          let sortedReviews = data.data
            .filter((review) => review.attributes.hotel_id === id)
            .map((review) => {
              return { ...review, date: new Date(review.attributes.publishedAt) };
            })
            .sort((a, b) => b.date - a.date);

          //Extract only the number to an array then sum
          let ratings = sortedReviews.map((review) => review.attributes.star_rating);
          const sum = ratings.reduce((partialSum, number) => partialSum + number, 0);

          //Update star_ratings in hotel
          const data1 = JSON.stringify({
            data: { star_rating: (sum / ratings.length).toFixed(1) },
          });
          const options2 = {
            method: "PUT",
            body: data1,
            headers: {
              "Content-Type": "application/json",
            },
          };
          if (sortedReviews.length > 0) {
            try {
              const response = await fetch(apiHotels + "/" + hotel.id, options2);
              console.log(response);
            } catch (error) {
              console.log(error);
            }
          }
          setReviews(sortedReviews);
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchReviews();
    // eslint-disable-next-line
  }, [toggleReviews]);

  return (
    <div className="reviews">
      <div className="enquiries__background"> </div>
      <div className="reviews__container">
        <Header type="main" header={`Reviews: ${hotel.attributes.name}`} />
        {/* <p>Here you can add and give a review on a hotel with a rating of 1-10.</p> */}
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="form__input--wrapper form__inputs--review">
            <div>
              <label htmlFor="name">Name</label>
              <input className="input" id="name" {...register("name")} type="text" />
              {errors.name && <span className="error-input">{errors.name.message}</span>}
            </div>
            <div>
              <label htmlFor="rating">Rating</label>
              <input id="rating" className="input" {...register("rating")} type="number" step="0.01" placeholder="1-10" />
              {errors.rating && <span className="error-input">{errors.rating.message}</span>}
            </div>
          </div>
          <div className="form__input--wrapper">
            <label htmlFor="message">Message</label>
            <textarea className="input" name="" id="message" {...register("message")} cols="50" rows="4" />
            {errors.message && <span className="error-input">{errors.message.message}</span>}
          </div>
          <div className="review__buttons">
            <button className="cta cta__bad" onClick={() => setShowReviews(false)}>
              Close
            </button>
            <button className="cta" type="submit">
              Submit
            </button>
          </div>
        </form>
        <div className="reviews__cards">
          {console.log(reviews)}
          {reviews.length > 0 ? (
            reviews.map((review, index) => {
              // const {publishedAt, }
              return (
                <div className="review__card" key={index}>
                  <div className="review__card--header">
                    <div>{moment(review.attributes.publishedAt).format("MMM Do, h:mm a")} </div>
                    <div>
                      <i className="fas fa-star"></i> {review.attributes.star_rating}/10
                    </div>
                  </div>
                  <div className="review__card--name">{review.attributes.name} saying:</div>
                  <div>{review.attributes.message}</div>
                </div>
              );
            })
          ) : (
            <div className="reviews__cards--none">Currently no reviews on this place. Will you be the first one?</div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Reviews;
