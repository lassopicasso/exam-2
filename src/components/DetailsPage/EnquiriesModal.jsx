import React, { useState, useRef } from "react";
import { useEffect } from "react";
import DatePicker from "react-datepicker";
import Header from "../../common/Header";

function EnquiriesModal({ setShowModul, handleSubmit, price }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [startDate, endDate] = dateRange;
  const [expandGuest, setExpandGuest] = useState(false);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [room, setRoom] = useState(1);
  const [bookingPrice, setBookingPrice] = useState(price);
  //   const [bookingDate, setBookingDate] = useState(0);
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
      } else {
        target.classList.contains("children") ? setChildren(children + 1) : setRoom(room + 1);
      }
    }
  }

  useEffect(() => {
    let sumPrice = adult * price + parseInt(children * (price * 0.5));
    //Amount of nights, 8.64e7 milliseconds in 1 day.
    let days = (dateRange[1] - dateRange[0]) / 8.64e7;
    days = days >= 1 ? days : 1;
    setBookingPrice(sumPrice * days);
  }, [adult, children, dateRange]);

  return (
    <div className="enquiries">
      <div className="enquiries__content">
        <h1>Reservation Enquiry</h1>
        <form onSubmit={(data) => handleSubmit(data)}>
          <div>
            <label>Name</label>
            <input className="name" type="text" />
          </div>
          <div>
            <label>Email</label>
            <input className="email" type="email" />
          </div>
          <div className="enquiries__date">
            <label>Date</label>
            <DatePicker
              selectsRange={true}
              startDate={startDate}
              endDate={endDate}
              minDate={new Date()}
              onChange={(update) => {
                setDateRange(update);
              }}
              placeholderText="Check-in  -  Check-out"
              className="date"
            />
          </div>
          <div className="guests__container">
            <label>Guests</label>
            <div className="guests" onClick={() => setExpandGuest(true)}>
              {adult} Adult - {children} Children - {room} Room
            </div>
            <div className="guests__expand" ref={guestsMenu} style={{ display: expandGuest ? "block" : "none" }}>
              <div className="guest__expand_input">
                <span>Adult</span>
                <div>
                  <i className="fas fa-minus adult" onClick={(event) => handleGuests(event)}></i>
                  <input type="number" className="adult" value={adult} disabled />
                  <i className="fas fa-plus adult" onClick={(event) => handleGuests(event)}></i>
                </div>
              </div>
              <div className="guest__expand_input">
                <span>Children</span>
                <div>
                  <i className="fas fa-minus children" onClick={(event) => handleGuests(event)}></i>
                  <input className="children" type="number" value={children} disabled />
                  <i className="fas fa-plus children" onClick={(event) => handleGuests(event)}></i>
                </div>
              </div>
              <div className="guest__expand_input">
                <span>Room</span>
                <div>
                  <i className="fas fa-minus room" onClick={(event) => handleGuests(event)}></i>
                  <input type="number" className="room" value={room} disabled />
                  <i className="fas fa-plus room" onClick={(event) => handleGuests(event)}></i>
                </div>
              </div>
            </div>
          </div>
          <div>
            <label>Message</label>
            <textarea rows="5" cols="20" />
          </div>
          <div className="enquiries__price">
            <Header type="sub" header="Total Price" /> <span>{bookingPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")} NOK</span>
          </div>
          <div className="enquiries__button">
            <button className="cta cta__bad" onClick={() => setShowModul(false)}>
              Close
            </button>
            <button className="cta" type="submit">
              Send
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EnquiriesModal;
