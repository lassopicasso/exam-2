import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import { apiHotels } from "../../constants/api";
import Carousel from "./Carousel";
import Search from "./Search";
function Home() {
  const [hotels, setHotels] = useState([]);
  const [newHotels, setNewHotels] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const apiUrl = apiHotels + "?populate=*";
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          console.log(data.data);
          let sortedHotels = data.data
            .map((hotel) => {
              return { ...hotel, date: new Date(hotel.attributes.publishedAt) };
            })
            .sort((a, b) => b.date - a.date);
          console.log(newHotels);
          setHotels(sortedHotels);
          setNewHotels(sortedHotels.slice(0, 4));
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
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

  if (loading) {
    return <main>Loading...</main>;
  }
  if (error) {
    return <main>{error}</main>;
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
          <div className="search__wrapper">
            <label htmlFor="search__input">
              <i className="fas fa-search"></i>
            </label>
            <input type="text" id="search__input" placeholder="Search for a stay in Bergen" onChange={hotelSearch} />
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
