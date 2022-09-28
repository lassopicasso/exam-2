import React from "react";
import { Link } from "react-router-dom";

function Carousel({ hotel }) {
  const name = hotel.attributes.name;
  const price = hotel.attributes.price;
  const image = hotel.attributes.images.data !== null ? hotel.attributes.images.data[0].attributes.url : "";

  return (
    <div className="home__carousel-item">
      <div className="home__carousel-img" style={{ backgroundImage: `url(${image})` }}>
        <Link to={`/details/${hotel.id}`}>
          <div>
            <span>{name}</span>
          </div>
        </Link>
      </div>
      <div className="home__carousel-text">From {price} NOK</div>
    </div>
  );
}

export default Carousel;
