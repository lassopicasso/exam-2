import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Header from "../../common/Header";
import EnquiriesModal from "./EnquiriesModal";
import Reviews from "../../common/Reviews";
import { Link } from "react-router-dom";
import ResponseMessage from "../../common/ResponseMessage";
import DetailsCarousel from "./DetailsCarousel";
import Head from "../../common/Head";
function Details() {
  const [hotel, setHotel] = useState("");
  const [images, setImages] = useState([]);
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
      <main className="details">
        <Head title={hotel.attributes.name} description={`Welcome to beautiful ${hotel.attributes.name}. Take a look at what it can offer, and what earlier guests have written about this accommodation.`} addPostFixTitle={true} />
        <DetailsCarousel images={images} />
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
