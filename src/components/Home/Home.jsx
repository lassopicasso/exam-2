import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import { apiHotels } from "../../constants/api";
import Carousel from "./Carousel";
import Search from "./Search";
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
    let filteredSearch = hotels.filter((hotel) => {
      hotel = hotel.attributes.name.toLowerCase();
      let input = event.target.value.toLowerCase();
      return hotel.includes(input);
    });
    console.log(filteredSearch.length);
    if (filteredSearch.length === hotels.length) {
      filteredSearch = [];
      console.log("it is ZERO!");
    }
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
          <div className="search__input">
            <button>
              <i className="fas fa-search"></i>
            </button>
            <input type="text" placeholder="Search for a stay in Bergen" onChange={hotelSearch} />
          </div>
          <div className="search__results">
            {searchResults &&
              searchResults.slice(0, 5).map((hotel) => {
                return <Search hotel={hotel} key={hotel.id} />;
              })}
          </div>
        </div>
      </main>
    </>
  );
}

export default Home;
