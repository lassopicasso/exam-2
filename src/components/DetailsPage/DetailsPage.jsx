import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../common/Header";
import { apiEnquiry } from "../../constants/api";
import EnquiriesModal from "./EnquiriesModal";
import Reviews from "../../common/Reviews";

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
  const [errorName, setErrorName] = useState(false);
  const [errorEmail, setErrorEmail] = useState(false);
  const [errorDate, setErrorDate] = useState(false);
  const [dateRange, setDateRange] = useState([null, null]);
  const [bookingPrice, setBookingPrice] = useState(null);
  const [showReviews, setShowReviews] = useState(false);

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
          setBookingPrice(data.data.attributes.price);
        }
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    carouselMargin === 0 ? setMaxedLeft(true) : setMaxedLeft(false);
    carouselMargin - 100 === images.length * -100 ? setMaxedRight(true) : setMaxedRight(false);
    setImageIndex(carouselMargin === 0 ? 1 : Math.abs(carouselMargin / 100) + 1);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [carouselMargin]);

  async function handleSubmit(event) {
    event.preventDefault();
    const inputName = document.querySelector("#name").value.trim();
    const inputEmail = document.querySelector("#email").value.trim();
    const inputDate = document.querySelector("#date").value;
    const inputAdult = document.querySelector("#adult").value;
    const inputChildren = document.querySelector("#children").value;
    const inputRoom = document.querySelector("#room").value;
    const inputMessage = document.querySelector("#message").value;
    const validated = validationForm(inputName, inputEmail);

    if (validated) {
      let data = JSON.stringify({
        data: { hotel: hotel.attributes.name, name: inputName, email: inputEmail, date: inputDate, message: inputMessage, adult: inputAdult, children: inputChildren, room: inputRoom, price: bookingPrice },
      });
      const options = {
        method: "POST",
        body: data,
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const response = await fetch(apiEnquiry, options);
        const json = await response.json();
        console.log(json);
      } catch (error) {
        console.log(error);
      }
    }
  }

  function validationForm(inputName, inputEmail) {
    //Only check if name, email and booking dates are valid. Guests has a valid default and message is optional.
    let nameValid = inputName.length >= 3 ? true : false;
    if (!nameValid) {
      setErrorName(true);
    }
    let bookingValid = (dateRange[1] - dateRange[0]) / 8.64e7 >= 1 ? true : false;
    if (!bookingValid) {
      setErrorDate(true);
    }
    const emailExpression = /\S+@\S+\.\S+/;
    let emailValid = emailExpression.test(inputEmail) ? true : false;
    if (!emailValid) {
      setErrorEmail(true);
    }
    return nameValid && bookingValid && emailValid ? true : false;
  }

  if (loading) {
    return <main>Loading...</main>;
  }
  if (error) {
    return <main>{error}</main>;
  }
  return (
    <>
      <div className="modul--carousel"></div>
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
          <div className="details__text">
            <div className="details__intro">
              <Header header={hotel.attributes.name} type="main" />
              <div>{hotel.attributes.distance}km to downtown</div>
              <div className="rating__link" onClick={() => setShowReviews(true)}>
                <i className="fas fa-star"></i> {hotel.attributes.star_rating !== 0 ? hotel.attributes.star_rating : "?"}/10 View Ratings
              </div>
              {showReviews && <Reviews hotel={hotel} setShowReviews={setShowReviews} />}
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
        {showModul && (
          <EnquiriesModal
            setShowModul={setShowModul}
            handleSubmit={handleSubmit}
            price={hotel.attributes.price}
            bookingPrice={bookingPrice}
            setBookingPrice={setBookingPrice}
            errorName={errorName}
            setErrorName={setErrorName}
            errorEmail={errorEmail}
            setErrorEmail={setErrorEmail}
            dateRange={dateRange}
            setDateRange={setDateRange}
            errorDate={errorDate}
            setErrorDate={setErrorDate}
          />
        )}
      </main>
    </>
  );
}

export default Details;
