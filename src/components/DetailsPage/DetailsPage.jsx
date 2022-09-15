import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../common/Header";
import EnquiriesModal from "./EnquiriesModal";

function Details() {
  const [hotel, setHotel] = useState("");
  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(1);
  const [carouselMargin, setCarouselMargin] = useState(0);
  const [maxedLeft, setMaxedLeft] = useState(true);
  const [maxedRight, setMaxedRight] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showModul, setShowModul] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();

  if (!id) {
    navigate("/");
  }

  useEffect(() => {
    const pageUrl = `https://the-holidaze.herokuapp.com/api/hotels/${id}?populate=*`;
    async function fetchData() {
      try {
        const response = await fetch(pageUrl);
        if (response.ok) {
          const data = await response.json();
          console.log(data.data);
          setHotel(data.data);
          setImages(data.data.attributes.images.data);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    carouselMargin === 0 ? setMaxedLeft(true) : setMaxedLeft(false);
    carouselMargin - 100 === images.length * -100 ? setMaxedRight(true) : setMaxedRight(false);
    console.log(carouselMargin);
    setImageIndex(carouselMargin === 0 ? 1 : Math.abs(carouselMargin / 100) + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselMargin]);

  function handleSubmit(data) {
    data.preventDefault();
    console.log(data);
  }

  if (loading) {
    return <main>Loading...</main>;
  }
  if (error) {
    return <main>{error}</main>;
  }
  return (
    <>
      <main>
        <div className="details__carousel">
          <div className="carousel__wrapper" style={{ marginLeft: `${carouselMargin}%` }}>
            {images.map((image) => {
              return <div className="carousel__img" key={image.id} style={{ backgroundImage: `url(${image.attributes.url})` }}></div>;
            })}
          </div>
          <div className="carousel__elements">
            <div className="carousel__buttons">
              <button className="carousel__button-left" disabled={maxedLeft ? true : false} onClick={() => setCarouselMargin(carouselMargin + 100)}>
                <i className="fas fa-chevron-left left"></i>
              </button>
              <button className="carousel__button-right" disabled={maxedRight ? true : false} onClick={() => setCarouselMargin(carouselMargin - 100)}>
                <i className="fas fa-chevron-right right"></i>
              </button>
            </div>
            <span>
              {imageIndex} / {images.length}
            </span>
          </div>
        </div>
        <div>
          <div className="details__text">
            <div className="details__intro">
              <Header header={hotel.attributes.name} type="main" />
              <span>{hotel.attributes.distance}km to downtown</span>
              <span>
                <i className="fas fa-star"></i> {hotel.attributes.star_rating === null ? 5 : hotel.attributes.star_rating}/10 Ratings
              </span>
            </div>
            <div>
              <Header header="About" type="content" />
              <p>{hotel.attributes.about}</p>
            </div>
            <div>
              <Header header="Facilities" type="content" />
              <p>{hotel.attributes.facilities} </p>
            </div>
          </div>
          <div className="details__order">
            <div className="details__order-text">
              <Header header="Order" type="sub" />
              <span>{`${hotel.attributes.price} NOK pp`}</span>
            </div>
            <button className="cta" onClick={() => setShowModul(true)}>
              Order
            </button>
          </div>
        </div>
        {showModul && <EnquiriesModal setShowModul={setShowModul} handleSubmit={handleSubmit} price={hotel.attributes.price} />}
      </main>
    </>
  );
}

export default Details;
