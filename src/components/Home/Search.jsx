import React from "react";
import { Link } from "react-router-dom";

function Search({ hotel }) {
  let hotelImg = hotel.attributes.image.data.attributes.url;
  return (
    <Link className="search__item" to={`/details/${hotel.id}`}>
      {hotel.attributes.name} <img src={hotelImg} alt={`Cover image of ${hotel.attributes.name}`}></img>
    </Link>
  );
}

export default Search;
