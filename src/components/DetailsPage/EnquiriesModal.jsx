import React, { useState, useRef } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import Header from "../../common/Header";
import ResponseMessage from "../../common/ResponseMessage";

function EnquiriesModal({ setShowModul, handleSubmit, price, errorName, setErrorName, errorEmail, setErrorEmail, dateRange, setDateRange, errorDate, setErrorDate, bookingPrice, setBookingPrice, responseMessage, setResponseMessage }) {
  const [startDate, endDate] = dateRange;
  const [expandGuest, setExpandGuest] = useState(false);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState(1);
  const guestsMenu = useRef(null);

  document.addEventListener("mousedown", checkClick);

  function checkClick(event) {
    if (guestsMenu.current && expandGuest && !guestsMenu.current.contains(event.target)) {
      setExpandGuest(false);
    }
  }

  function handleGuests(event) {
    const target = event.target;
    if (target.classList.contains("fa-minus")) {
      if (target.classList.contains("adult") && adult > 1) {
        //Adults can't be less than rooms.
        if (adult === room) {
          setRoom(adult - 1);
        }
        setAdult(adult - 1);
      }
      if (target.classList.contains("children") && children >= 1) {
        setChildren(children - 1);
      }
      if (target.classList.contains("room") && room > 1) {
        setRoom(room - 1);
      }
    } else {
      if (target.classList.contains("adult")) {
        setAdult(adult + 1);
      }
      if (target.classList.contains("children")) {
        setChildren(children + 1);
      }
      //Adults can't be less than rooms.
      if (target.classList.contains("room") && room !== adult) {
        setRoom(room + 1);
      }
    }
  }

  useEffect(() => {
    let sumPrice = adult * price + parseInt(children * (price * 0.5));
    //Amount of nights, 8.64e7 milliseconds in 1 day.
    let days = (dateRange[1] - dateRange[0]) / 8.64e7;
    days = days >= 1 ? days : 1;
    setBookingPrice(sumPrice * days);
    // eslint-disable-next-line
  }, [adult, children, dateRange]);

  return (
    <div className="enquiries">
      <div className="enquiries__background"></div>
      <div className="enquiries__content">
        <Header type="main" header="Reservation Enquiry" />
        {responseMessage && <ResponseMessage type={responseMessage.response} message={responseMessage.message} />}
        <form className="form" onSubmit={(event) => handleSubmit(event)}>
          <div className="enquiries__input form__input--wrapper">
            <label htmlFor="name">Name</label>
            <input
              className="input name"
              id="name"
              type="text"
              onChange={() => {
                setErrorName(false);
              }}
            />
            {errorName && <span className="error-input">Minimum 3 characters</span>}
          </div>
          <div className="enquiries__input form__input--wrapper">
            <label htmlFor="email">Email</label>
            <input
              id="email"
              className="email input"
              type="email"
              onChange={() => {
                setErrorEmail(false);
              }}
            />
            {errorEmail && <span className="error-input">Enter a valid email</span>}
          </div>
          <div className="enquiries__date enquiries__input form__input--wrapper">
            <label htmlFor="date">Date</label>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              onChange={(update) => {
                setDateRange(update);
                setErrorDate(false);
              }}
              placeholderText="Check-in  -  Check-out"
              className="date input"
              id="date"
            />
            {errorDate && <span className="error-input">Minimum 1 night stay</span>}
          </div>
          <div className="guests__container enquiries__input form__input--wrapper">
            <label>Guests</label>
            <div className="guests input" onClick={() => setExpandGuest(true)}>
              {adult} Adult - {children} Children - {room} Room
            </div>
            <div className="guests__expand" ref={guestsMenu} style={{ display: expandGuest ? "block" : "none" }}>
              <div className="guest__expand--wrapper">
                <span>
                  Adult <span className="guest__label-small">{price} NOK</span>
                </span>
                <div className="guest__expand--input">
                  <i className="fas fa-minus adult" onClick={(event) => handleGuests(event)}></i>
                  <input type="number" className="adult guest__input" value={adult} disabled id="adult" />
                  <i className="fas fa-plus adult" onClick={(event) => handleGuests(event)}></i>
                </div>
              </div>
              <div className="guest__expand--wrapper">
                <span>
                  Children <span className="guest__label-small">{price * 0.5} NOK</span>
                </span>
                <div className="guest__expand--input">
                  <i className="fas fa-minus children" onClick={(event) => handleGuests(event)}></i>
                  <input className="children guest__input" type="number" value={children} disabled id="children" />
                  <i className="fas fa-plus children" onClick={(event) => handleGuests(event)}></i>
                </div>
              </div>
              <div className="guest__expand--wrapper">
                <span>
                  Room <span className="guest__label-small">Free</span>
                </span>
                <div className="guest__expand--input">
                  <i className="fas fa-minus room" onClick={(event) => handleGuests(event)}></i>
                  <input type="number" className="room guest__input" value={room} disabled id="room" />
                  <i className="fas fa-plus room" onClick={(event) => handleGuests(event)}></i>
                </div>
              </div>
            </div>
          </div>
          <div className="enquiries__input form__input--wrapper">
            <label>Message</label>
            <textarea className="input" rows="5" cols="20" placeholder="Comment on your booking (optional)" id="message" />
          </div>
          <div className="enquiries__price">
            <Header type="sub" header="Total Price" />
            <span>{bookingPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} NOK</span>
          </div>
          <div className="enquiries__button">
            <button
              className="cta cta__bad"
              onClick={() => {
                setResponseMessage(null);
                setShowModul(false);
              }}
            >
              Close
            </button>
            <button className="cta" type="submit">
              Book
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EnquiriesModal;
