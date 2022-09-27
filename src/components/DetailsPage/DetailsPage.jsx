import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../common/Header";
import EnquiriesModal from "./EnquiriesModal";
import Reviews from "../../common/Reviews";
import { Link } from "react-router-dom";
import ResponseMessage from "../../common/ResponseMessage";

function Details() {
  const [hotel, setHotel] = useState("");
  const [images, setImages] = useState([]);
  const [imageIndex, setImageIndex] = useState(1);
  const [carouselMargin, setCarouselMargin] = useState(0);
  const [maxedLeft, setMaxedLeft] = useState(true);
  const [maxedRight, setMaxedRight] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showModul, setShowModul] = useState(false);
  const { id } = useParams();
  const navigate = useNavigate();
  const [showReviews, setShowReviews] = useState(false);
  const [responseMessage, setResponseMessage] = useState(null);

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
          setHotel(data.data);
          setImages(data.data.attributes.images.data);
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

  //Setting the carousel margin/swing position.
  useEffect(() => {
    carouselMargin === 0 ? setMaxedLeft(true) : setMaxedLeft(false);
    carouselMargin - 100 === images.length * -100 ? setMaxedRight(true) : setMaxedRight(false);
    setImageIndex(carouselMargin === 0 ? 1 : Math.abs(carouselMargin / 100) + 1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselMargin]);

  if (loading) {
    return <main>Loading...</main>;
  }
  if (responseMessage && responseMessage.response === "error") {
    return (
      <main>
        <ResponseMessage type={responseMessage.response} message={responseMessage.message} />
      </main>
    );
  }
  return (
    <>
      <main className="details">
        <div className="details__carousel--parent">
          <div className="details__carousel">
            <div className="carousel__wrapper" style={{ marginLeft: `${carouselMargin}%`, width: images.length * 100 + "%" }}>
              {images.map((image, index) => {
                return <div className="carousel__img" key={index} style={{ backgroundImage: `url(${image.attributes.url})` }}></div>;
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
          <div className="smallCarousel">
            <div className="smallCarousel__container" style={{ marginTop: imageIndex > 4 ? (imageIndex - 4) * -97 + "px" : 0 }}>
              {images.map((image, index) => {
                return <div className="carousel__smallImg" key={index} style={{ backgroundImage: `url(${image.attributes.url})`, opacity: carouselMargin / index === -100 || (carouselMargin === 0 && index === 0) ? 1 : 0.4 }} onClick={() => setCarouselMargin(index * -100)}></div>;
              })}
            </div>
          </div>
        </div>
        <div className="details__content">
          {showReviews && <Reviews hotel={hotel} setShowReviews={setShowReviews} />}
          <div className="details__text">
            <Link to="/explore" className="return--link">
              Return to Explore
            </Link>
            <div className="details__intro">
              <Header header={hotel.attributes.name} type="main" />
              <div>{hotel.attributes.distance}km to downtown</div>
              <div className="rating__link" onClick={() => setShowReviews(true)}>
                <i className="fas fa-star"></i> {hotel.attributes.star_rating !== null ? hotel.attributes.star_rating : "?"}/10 View Ratings
              </div>
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
              <div>
                <span className="details__order--price">{`${hotel.attributes.price} NOK pp`}</span>
                <span className="details__order--children">Children - 50% discount</span>
                <span className="details__order--children display__desktop">Pay at arrival</span>
                <span className="details__order--children display__desktop">Free cancellation</span>
              </div>
            </div>
            <button className="cta" onClick={() => setShowModul(true)}>
              Order
            </button>
          </div>
        </div>
        {showModul && <EnquiriesModal hotel={hotel.attributes.name} setShowModul={setShowModul} price={hotel.attributes.price} />}
      </main>
    </>
  );
}

export default Details;
