import moment from "moment";
import React, { useState, useEffect } from "react";
import Header from "../../common/Header";
import { apiHotels } from "../../constants/api";
import Cards from "./Cards";
import Search from "../../common/Search";
import FilterSort from "./FilterSort";
import Head from "../../common/Head";
import ResponseMessage from "../../common/ResponseMessage";
import Loading from "../../common/Loading";

function Explore() {
  const [expandFilterSort, setExpandFilterSort] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [sortFilterHotels, setSortFilterHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [responseMessage, setResponseMessage] = useState(null);
  const [priceRange, setPriceRange] = useState({ label: "No Limit", min: 0, max: Infinity });
  const [sort, setSort] = useState({ type: "date", btn: "btn1" });
  const [limitDisplay, setLimitDisplay] = useState(5);
  const [searchResults, setSearchResults] = useState(null);

  const apiUrl = apiHotels + "?populate=*";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setHotels(data.data);
          setSortFilterHotels(data.data);
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
    console.log("Search box interacts");
    let filteredSearch = hotels.filter((hotel) => {
      hotel = hotel.attributes.name.toLowerCase();
      let input = event.target.value.toLowerCase();
      return hotel.includes(input);
    });
    console.log(filteredSearch.length);
    if (filteredSearch.length === hotels.length) {
      filteredSearch = null;
      console.log("it is ZERO!");
    }
    setSearchResults(filteredSearch);
  }

  function handleSubmit(e) {
    e.preventDefault();
    const priceFiltered = hotels.filter((hotel) => {
      return hotel.attributes.price <= priceRange.max && hotel.attributes.price >= priceRange.min;
    });
    if (sort.type === "price") {
      priceFiltered.sort((a, b) => {
        return sort.btn === "btn1" ? a.attributes.price - b.attributes.price : b.attributes.price - a.attributes.price;
      });
    }
    if (sort.type === "date") {
      priceFiltered.sort((a, b) => {
        return sort.btn === "btn1" ? new Date(b.attributes.publishedAt) - new Date(a.attributes.publishedAt) : new Date(a.attributes.publishedAt) - new Date(b.attributes.publishedAt);
      });
    }
    if (sort.type === "rating") {
      priceFiltered.sort((a, b) => {
        return sort.btn === "btn1" ? b.attributes.star_rating - a.attributes.star_rating : a.attributes.star_rating - b.attributes.star_rating;
      });
    }
    if (sort.type === "distance") {
      priceFiltered.sort((a, b) => {
        return sort.btn === "btn1" ? a.attributes.distance - b.attributes.distance : b.attributes.distance - a.attributes.distance;
      });
    }
    //Turn "Load More" button on and off based on the filter and sort results.
    if (priceFiltered.length < 5) {
      setLimitDisplay(hotels.length);
    } else {
      setLimitDisplay(5);
    }

    setSortFilterHotels(priceFiltered);
    //Mobile view-port the filter sort container is a dropdown that collapse when submitted.
    setExpandFilterSort(!expandFilterSort);
  }

  if (loading) {
    return <Loading />;
  }
  if (responseMessage) {
    <ResponseMessage type={responseMessage.response} message={responseMessage.message} />;
  }

  return (
    <>
      <Head title="Explore" description="Explore our accommodations in Bergen by searching, filter and sort." addPostFixTitle={true} />
      <div className="explore__hero" />
      <main className="explore">
        <Header header="Find your next stay" type="main" />
        <div className="explore__search">
          <div className="search__wrapper">
            <label htmlFor="search__input">
              <i className="fas fa-search"></i>
            </label>
            <input type="text" id="search__input" placeholder="Search for a place" onChange={hotelSearch} />
          </div>
          {searchResults && <Search searchResults={searchResults} setSearchResults={setSearchResults} />}
        </div>
        <div className="explore__content">
          <div className={`filterSort ${expandFilterSort ? "filterSort-active" : ""}`}>
            <button className={`filterSort__button ${expandFilterSort ? "filterSort__button-active" : ""}`} onClick={() => setExpandFilterSort(!expandFilterSort)}>
              <span>Filter & Sort </span> {expandFilterSort ? <i className="fas fa-caret-up"></i> : <i className="fas fa-caret-down"></i>}
            </button>
            <FilterSort expandFilterSort={expandFilterSort} key={moment} handleSubmit={handleSubmit} setPriceRange={setPriceRange} priceRange={priceRange} sort={sort} setSort={setSort} />
          </div>
          <div className="cards">
            {sortFilterHotels.map((hotel, index) => {
              return index < limitDisplay ? <Cards hotel={hotel} key={index} /> : "";
            })}
            <button className="cta" style={{ display: limitDisplay >= hotels.length ? "none" : "block" }} onClick={() => setLimitDisplay(limitDisplay + 5)}>
              Load More
            </button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Explore;
