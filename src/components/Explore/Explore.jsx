import moment from "moment";
import React, { useState, useEffect } from "react";
import Header from "../../common/Header";
import { apiHotels } from "../../constants/api";
import Cards from "./Cards";
import FilterSort from "./FilterSort";
// import { CSSTransition } from "react-transition-group";
function Explore() {
  const [expandFilterSort, setExpandFilterSort] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [sortFilterHotels, setSortFilterHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [priceRange, setPriceRange] = useState({ label: "No Limit", min: 0, max: Infinity });
  const [sort, setSort] = useState({ type: "date", btn: "btn1" });
  const apiUrl = apiHotels + "?populate=*";

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiUrl);
        if (response.ok) {
          const data = await response.json();
          setHotels(data.data);
          setSortFilterHotels(data.data);
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
    setSortFilterHotels(priceFiltered);
    setExpandFilterSort(!expandFilterSort);
  }

  if (loading) {
    return <main>Loading...</main>;
  }
  if (error) {
    return <main>{error}</main>;
  }

  return (
    <>
      <div className="explore__hero" />
      <main className="explore">
        <Header header="Find your next stay" type="main" />
        <div className="search__wrapper">
          <label htmlFor="search__input">
            <i className="fas fa-search"></i>
          </label>
          <input type="text" id="search__input" placeholder="Search for a place" />
        </div>
        <div className="explore__content">
          <div className={`filterSort ${expandFilterSort ? "filterSort-active" : ""}`}>
            <button className={`filterSort__button ${expandFilterSort ? "filterSort__button-active" : ""}`} onClick={() => setExpandFilterSort(!expandFilterSort)}>
              <span>Filter & Sort </span> {expandFilterSort ? <i className="fas fa-caret-up"></i> : <i className="fas fa-caret-down"></i>}
            </button>
            {/* <CSSTransition in={expandFilterSort} timeout={400} unmountOnExit appear> */}
            {/* {expandFilterSort && <FilterSort key={moment} handleSubmit={handleSubmit} setPriceRange={setPriceRange} priceRange={priceRange} sort={sort} setSort={setSort} />} */}
            <FilterSort expandFilterSort={expandFilterSort} key={moment} handleSubmit={handleSubmit} setPriceRange={setPriceRange} priceRange={priceRange} sort={sort} setSort={setSort} />

            {/* </CSSTransition> */}
          </div>
          <div className="cards">
            {sortFilterHotels.map((hotel, index) => {
              return <Cards hotel={hotel} key={index} />;
            })}
            <button className="cta">Load More</button>
          </div>
        </div>
      </main>
    </>
  );
}

export default Explore;
