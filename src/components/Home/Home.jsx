import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import { apiHotels } from "../../constants/api";
import Carousel from "./Carousel";
function Home() {
  const [hotels, setHotels] = useState([]);
  const [newHotels, setNewHotels] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiHotels);
        if (response.ok) {
          const data = await response.json();
          console.log(data.data);
          let sortedHotels = data.data
            .map((hotel) => {
              return { ...hotel, date: new Date(hotel.attributes.createdAt) };
            })
            .sort((a, b) => b.date - a.date);
          console.log(newHotels);
          setHotels(sortedHotels);
          setNewHotels(sortedHotels.slice(0, 4));
        }
      } catch (error) {
        console.log(error);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  function hotelSearch(event) {
    console.log("Search box interacts");
    console.log(event.target.value);
    console.log(hotels);
    let filteredSearch = hotels.filter((hotel) => {
      hotel = hotel.attributes.name.toLowerCase();
      let input = event.target.value.toLowerCase();
      if (hotel.includes(input)) {
        return hotel;
      }
    });
    console.log(filteredSearch.length);
    if (filteredSearch.length === hotels.length) {
      filteredSearch = [];
      console.log("it is ZERO!");
    }

    // (filteredSearch === filteredSearch.length) === 0 ? setSearchResults([]) : setSearchResults(filteredSearch);
    // document.querySelector(".search__results").style.opacity = "0";
    setSearchResults(filteredSearch);
  }
  return (
    <>
      <div className="home__backgroundImg" />
      <main className="home__main">
        <div className="home__carousel">
          <Header header="New Offers" type="main" />
          <div className="home__carousel-wrapper">
            <div className="home__carousel-content">
              {newHotels.map((hotel) => {
                return <Carousel hotel={hotel} key={hotel.id} />;
              })}
            </div>
          </div>
        </div>
        <div className="home__search">
          <button>
            <i className="fas fa-search"></i>
          </button>

          <input type="text" placeholder="Search for a stay in Bergen" onChange={hotelSearch} />
        </div>
        <div className="search__results">
          {searchResults &&
            searchResults.map((hotel) => {
              return <div>{hotel.attributes.name}</div>;
            })}
        </div>
      </main>
    </>
  );
}

export default Home;
