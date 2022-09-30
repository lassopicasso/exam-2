import React, { useState, useEffect } from "react";
import Header from "../../common/Header";
import { Link } from "react-router-dom";
import Reviews from "../../common/Reviews";

function Cards({ hotel }) {
  const [carouselMargin, setCarouselMargin] = useState(0);
  const [maxedLeft, setMaxedLeft] = useState(true);
  const images = hotel.attributes.images.data;
  const [maxedRight, setMaxedRight] = useState(false);
  const [showReviews, setShowReviews] = useState(false);
  const { name, distance, price, star_rating } = hotel.attributes;

  //When sortFilterButton is clicked, card carousels returns to first image.
  //This also prevents a bug where the carouselswing can have a wrong position if interacted and then the sortFilterButton is clicked.
  const sortFilterButton = document.querySelector(".cta__update");
  if (sortFilterButton !== null) {
    sortFilterButton.addEventListener("click", () => {
      setCarouselMargin(0);
    });
  }

  //Checks if left or right button in carousel-card should be disabled
  useEffect(() => {
    carouselMargin === 0 ? setMaxedLeft(true) : setMaxedLeft(false);
    carouselMargin - 100 === images.length * -100 ? setMaxedRight(true) : setMaxedRight(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselMargin]);

  return (
    <>
      {showReviews && <Reviews hotel={hotel} setShowReviews={setShowReviews} />}
      <div className="card">
        <div className="card__carousel" id={hotel.id}>
          <Link to={`/details/${hotel.id}`}>
            <div className="card__carousel_wrapper" style={{ width: images.length * 100 + "%", marginLeft: `${carouselMargin}%` }}>
              {images.map((image, index) => {
                return <div className="card__img" key={index} style={{ backgroundImage: `url(${image.attributes.url})` }}></div>;
              })}
            </div>
          </Link>
          <div className="card__buttons">
            <button className="carousel__button-left" disabled={maxedLeft ? true : false} onClick={() => setCarouselMargin(carouselMargin + 100)} aria-label="slide-left">
              <i className="fas fa-chevron-left left"></i>
            </button>
            <button className="carousel__button-right" disabled={maxedRight ? true : false} onClick={() => setCarouselMargin(carouselMargin - 100)} aria-label="slide-right">
              <i className="fas fa-chevron-right right"></i>
            </button>
          </div>
        </div>
        <div className="card__text">
          <div className="card__text--text">
            <div>
              <Header type="sub" header={name} />
              <div>{distance} km to downtown</div>
              <div className="card__rating rating__link" onClick={() => setShowReviews(true)}>
                <i className="fas fa-star" aria-label="reviews"></i> {star_rating !== null ? star_rating : "?"}/10 View Ratings
              </div>
            </div>
            <span className="card__price">From {price} NOK </span>
          </div>
          <div className="card__text--button">
            <Link className="cta" to={`/details/${hotel.id}`}>
              Read More
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default Cards;
