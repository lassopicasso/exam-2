import React, { useEffect, useState } from "react";
import Header from "../../common/Header";
import { apiHotels } from "../../constants/api";
import Carousel from "./Carousel";
import Search from "../../common/Search";
import Head from "../../common/Head";
import ResponseMessage from "../../common/ResponseMessage";

function Home() {
  const [hotels, setHotels] = useState([]);
  const [newHotels, setNewHotels] = useState([]);
  const [searchResults, setSearchResults] = useState(null);
  const [loading, setLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState(null);
  const apiUrl = apiHotels + "?populate=*";
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          let sortedHotels = data.data
            .map((hotel) => {
              return { ...hotel, date: new Date(hotel.attributes.publishedAt) };
            })
            .sort((a, b) => b.date - a.date);
          setHotels(sortedHotels);
          setNewHotels(sortedHotels.slice(0, 4));
        } else {
          setResponseMessage({ response: "error", message: `Oh no! The following error occurred: ${response.statusText}` });
        }
      } catch (error) {
        setResponseMessage({ response: "error", message: `Oh no! The following error occurred: ${error}` });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  function hotelSearch(event) {
    let filteredSearch = hotels.filter((hotel) => {
      hotel = hotel.attributes.name.toLowerCase();
      let input = event.target.value.toLowerCase();
      return hotel.includes(input);
    });
    console.log(filteredSearch.length);
    if (filteredSearch.length === hotels.length) {
      filteredSearch = null;
    }
    setSearchResults(filteredSearch);
  }

  if (loading) {
    return <main>Loading...</main>;
  }
  if (responseMessage) {
    return (
      <main>
        <ResponseMessage type={responseMessage.response} message={responseMessage.message} />
      </main>
    );
  }

  return (
    <>
      <Head />
      <div className="home__backgroundImg" />
      <main className="home__main">
        <div className="home__carousel">
          <Header header="New Offers in Bergen" type="main" />
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
            <input type="text" id="search__input" placeholder="Search for accommodation" onChange={hotelSearch} />
          </div>
          {searchResults && <Search searchResults={searchResults} setSearchResults={setSearchResults} />}
        </div>
      </main>
    </>
  );
}

export default Home;
