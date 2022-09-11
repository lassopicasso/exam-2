import React, { useState, useEffect } from "react";
import Header from "../../common/Header";
import { apiHotels } from "../../constants/api";
import { priceList, buttonList } from "../../constants/arrays";

function Explore() {
  const [expandFilterSort, setExpandFilterSort] = useState(false);
  const [hotels, setHotels] = useState([]);
  const [sortFilterHotels, setSortFilterHotels] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [priceRange, setPriceRange] = useState({ label: "No Limit", min: 0, max: Infinity });
  const [sort, setSort] = useState({ type: "date", btn: "btn1" });
  const [maxedLeft, setMaxedLeft] = useState(true);
  const [maxedRight, setMaxedRight] = useState(false);
  const [numberOfImages, setNumberOfImages] = useState(0);
  const [carouselMargin, setCarouselMargin] = useState([{ name: "hello" }]);
  console.log(buttonList);
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiHotels);
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
  }, []);

  // useEffect(() => {
  //   console.log(expandFilterSort);
  // }, [expandFilterSort]);

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
        return sort.btn === "btn1" ? b.attributes.star_rating - a.attributes.price : a.attributes.star_rating - b.attributes.price;
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

  useEffect(() => {
    console.log(carouselMargin);
    // carouselMargin === 0 ? setMaxedLeft(true) : setMaxedLeft(false);
    // carouselMargin - 100 === numberOfImages * -100 ? setMaxedRight(true) : setMaxedRight(false);
    // console.log(numberOfImages);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselMargin]);

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
        <div className={`filterSort ${expandFilterSort ? "filterSort-active" : ""}`}>
          <button className={`filterSort__button ${expandFilterSort ? "filterSort__button-active" : ""}`} onClick={() => setExpandFilterSort(!expandFilterSort)}>
            <span>Filter & Sort </span> {expandFilterSort ? <i className="fas fa-caret-up"></i> : <i className="fas fa-caret-down"></i>}
          </button>
          {expandFilterSort && (
            <form onSubmit={handleSubmit}>
              <div className="filterSort__content">
                <div className="filterSort__filter">
                  <Header type="sub" header="Filter" />
                  <div className="filterSort__price">
                    <span> Total Price </span>
                    {priceList.map((price, index) => {
                      return (
                        <label key={index}>
                          <input
                            type="radio"
                            name="filter_price"
                            checked={priceRange.label === price.label}
                            onChange={() => {
                              setPriceRange(price);
                            }}
                          />
                          {price.label}
                        </label>
                      );
                    })}
                  </div>
                </div>
                <div className="filterSort__sort">
                  <Header type="sub" header="Sort" />
                  {buttonList.map((button, index) => {
                    return (
                      <>
                        <span key={index}>{button.title}</span>
                        <div key={index - 10} className="filterSort__buttons">
                          {button.btns.map((btn, index2) => {
                            return (
                              <input
                                key={index2}
                                className={`${btn.btn} sortBtn ${sort.type === button.type && sort.btn === btn.btn ? "sortBtn-active" : ""}`}
                                type="button"
                                value={btn.value}
                                onClick={() => {
                                  setSort({ type: button.type, btn: btn.btn });
                                }}
                              />
                            );
                          })}
                        </div>
                      </>
                    );
                  })}
                </div>
              </div>
              <div className="submit-container">
                <button className="cta__update cta" type="submit">
                  Update
                </button>
              </div>
            </form>
          )}
        </div>
        <div className="cards">
          {sortFilterHotels.map((hotel, index) => {
            const images = hotel.attributes.images.data;
            return (
              <div className="card">
                <div className="card__carousel">
                  <div className="card__carousel_wrapper" style={{ width: images.length * 100 + "%", marginLeft: carouselMargin + "%" }}>
                    {images.map((image) => {
                      return <div className="card__img" style={{ backgroundImage: `url(${image.attributes.url})` }}></div>;
                    })}
                  </div>
                  <div className="card__buttons">
                    <button
                      className="carousel__button-left"
                      disabled={maxedLeft ? true : false}
                      onClick={() => {
                        setNumberOfImages(images.length);
                        setCarouselMargin((prevState) => ({
                          ...prevState,
                          name: hotel,
                        }));
                      }}
                    >
                      <i className="fas fa-chevron-left left"></i>
                    </button>
                    <button
                      className="carousel__button-right"
                      disabled={maxedRight ? true : false}
                      onClick={() => {
                        const thisHotel = hotel.attributes.name;
                        setNumberOfImages(images.length);
                        // setCarouselMargin(carouselMargin - 100);
                        setCarouselMargin((prevState) => ({
                          ...prevState,
                          ...thisHotel,
                        }));
                      }}
                    >
                      <i className="fas fa-chevron-right right"></i>
                    </button>
                  </div>
                </div>
                <div key={index}>
                  <div>{hotel.attributes.name}</div>
                </div>
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default Explore;
