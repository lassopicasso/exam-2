import React, { useRef } from "react";
import { Link } from "react-router-dom";

function Search({ setSearchResults, searchResults }) {
  const dropDownSearch = useRef(null);
  //If clicked outside of the search input and results the search input resets
  document.addEventListener("mousedown", checkClick);
  function checkClick(event) {
    if (dropDownSearch.current && searchResults && !dropDownSearch.current.contains(event.target)) {
      setSearchResults(null);
      document.querySelector("#search__input").value = "";
    }
  }

  if (searchResults.length === 0) {
    return (
      <div className="search__results" ref={dropDownSearch}>
        <div className="search__item">No accommodations found</div>
      </div>
    );
  } else {
    return (
      <div className="search__results" ref={dropDownSearch}>
        {searchResults.map((hotel, index) => {
          let hotelImg = hotel.attributes.images.data[0].attributes.url;
          return (
            <Link className="search__item" to={`/details/${hotel.id}`} key={index}>
              {hotel.attributes.name} <img src={hotelImg} alt={`${hotel.attributes.name}`}></img>
            </Link>
          );
        })}
      </div>
    );
  }
}

export default Search;
