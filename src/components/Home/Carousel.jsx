import React from "react";

function Carousel({ hotel }) {
  const name = hotel.attributes.name;
  const price = hotel.attributes.price;
  const image = hotel.attributes.image.data.attributes.url;

  return (
    <div className="home__carousel-item">
      <div className="home__carousel-img" style={{ backgroundImage: `url(${image})` }}>
        <div>
          <span>{name}</span>
        </div>
      </div>
      <div className="home__carousel-text">From {price} NOK</div>
    </div>
  );
}

export default Carousel;
