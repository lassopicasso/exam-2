import React, { useState, useEffect } from "react";

function DetailsCarousel({ images }) {
  const [carouselMargin, setCarouselMargin] = useState(0);
  const [maxedLeft, setMaxedLeft] = useState(true);
  const [maxedRight, setMaxedRight] = useState(false);
  const [imageIndex, setImageIndex] = useState(1);

  //Setting the carousel margin/swing position.
  useEffect(() => {
    carouselMargin === 0 ? setMaxedLeft(true) : setMaxedLeft(false);
    carouselMargin - 100 === images.length * -100 ? setMaxedRight(true) : setMaxedRight(false);
    setImageIndex(carouselMargin === 0 ? 1 : Math.abs(carouselMargin / 100) + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselMargin]);

  return (
    <div className="details__carousel--parent">
      <div className="details__carousel">
        <div className="carousel__wrapper" style={{ marginLeft: `${carouselMargin}%`, width: images.length * 100 + "%" }}>
          {images.map((image, index) => {
            return <div className="carousel__img" key={index} style={{ backgroundImage: `url(${image.attributes.url})` }}></div>;
          })}
        </div>
        <div className="carousel__elements">
          <div className="carousel__buttons">
            <button className="carousel__button-left" disabled={maxedLeft ? true : false} onClick={() => setCarouselMargin(carouselMargin + 100)} aria-label="slide-left">
              <i className="fas fa-chevron-left left"></i>
            </button>
            <button className="carousel__button-right" disabled={maxedRight ? true : false} onClick={() => setCarouselMargin(carouselMargin - 100)} aria-label="slide-right">
              <i className="fas fa-chevron-right right"></i>
            </button>
          </div>
          <span>
            {imageIndex} / {images.length}
          </span>
        </div>
      </div>
      <div className="smallCarousel">
        <div className="smallCarousel__container" style={{ marginTop: imageIndex > 4 ? (imageIndex - 4) * -97 + "px" : 0 }}>
          {images.map((image, index) => {
            return <div className="carousel__smallImg" key={index} style={{ backgroundImage: `url(${image.attributes.url})`, opacity: carouselMargin / index === -100 || (carouselMargin === 0 && index === 0) ? 1 : 0.4 }} onClick={() => setCarouselMargin(index * -100)}></div>;
          })}
        </div>
      </div>
    </div>
  );
}

export default DetailsCarousel;
