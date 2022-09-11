import React, { useState, useEffect } from "react";
import Header from "../../common/Header";
import { apiHotels } from "../../constants/api";

function Explore() {
  const [expandFilterSort, setExpandFilterSort] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [filterList, setFilterList] = useState(false);
  const [labelText, setLabelText] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiHotels);
        if (response.ok) {
          const data = await response.json();
          setHotels(data.data);
          setLabelText(["Below 800 NOK", "800-1300 NOK", "1300-1800 NOK", "1800-2300 NOK", "2300-2800 NOK", "Above 2800 NOK"]);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
        setFilterList(true);
      }
    }
    fetchData();
  }, []);

  useEffect(() => {
    console.log(expandFilterSort);
  }, [expandFilterSort]);

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
        <div className="search__input">
          <button className="search__button">
            <i className="fas fa-search"></i>
          </button>
          <input type="text" placeholder="Search for a place" />
        </div>
        <div className="filterSort">
          <button className="filterSort__button" onClick={() => setExpandFilterSort(!expandFilterSort)}>
            <span>Filter & Sort </span> <i className="fas fa-caret-down"></i>
          </button>
          <div className="filterSort__content">
            <div className="filterSort__filter">
              <Header type="sub" header="Filter" />
              <div>
                <Header type="content" header="Total Price" />
                <div className="filterSort__price">
                  <div>
                    <label>
                      <input type="radio" name="filter_price" />
                      Below 800 NOK
                    </label>
                    <label>
                      <input type="radio" name="filter_price" />
                      800-1300 NOK
                    </label>
                    <label>
                      <input type="radio" name="filter_price" />
                      1300-1800 NOK
                    </label>
                  </div>
                  <div>
                    <label>
                      <input type="radio" name="filter_price" />
                      1800-2300 NOK
                    </label>
                    <label>
                      <input type="radio" name="filter_price" />
                      2300-2800 NOK
                    </label>
                    <label>
                      <input type="radio" name="filter_price" />
                      Above 2800 NOK
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <Header type="sub" header="Sort" />
            <div className="filterSort__sort">
              <div>
                <div className="filterSort__subcontent">
                  <Header type="content" header="Price" />
                  <div className="filterSort__buttons">
                    <button>Low</button> <button>High</button>
                  </div>
                </div>
                <div className="filterSort__subcontent">
                  <Header type="content" header="New - Old" />
                  <div className="filterSort__buttons">
                    <button>New</button> <button>Old</button>
                  </div>
                </div>
              </div>
              <div className="filterSort__subcontent">
                <div>
                  <Header type="content" header="Ratings" />
                  <div className="filterSort__buttons">
                    <button>High</button> <button>Low</button>
                  </div>
                </div>
                <div className="filterSort__subcontent">
                  <Header type="content" header="Distance" />
                  <div className="filterSort__buttons">
                    <button>Close</button> <button>Far</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="cards">
          {hotels.map((hotel) => {
            return (
              <>
                {/* <img></img> */}
                <div>
                  <div>{hotel.attributes.name}</div>
                </div>
              </>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default Explore;
