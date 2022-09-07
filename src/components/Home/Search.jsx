import React from "react";

function Search({ hotel }) {
  let hotelImg = hotel.attributes.image.data.attributes.url;
  return (
    <a className="search__item">
      {hotel.attributes.name} <img src={hotelImg} alt="Logo"></img>
    </a>
  );
}

export default Search;
