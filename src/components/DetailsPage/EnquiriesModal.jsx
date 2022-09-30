import React, { useState, useRef, useEffect } from "react";
import DatePicker from "react-datepicker";
import Header from "../../common/Header";
import ResponseMessage from "../../common/ResponseMessage";
import { apiEnquiry } from "../../constants/api";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

const schema = yup.object().shape({
  guestName: yup.string().required("Please enter your first name").min(3, "Minimum 3 characters"),
  email: yup.string().email().required("Please enter your email"),
  date: yup.number().min(1, "Minimum 1 night"),
});

function EnquiriesModal({ hotel, setShowModul, price }) {
  const [dateRange, setDateRange] = useState([null, null]);
  const [expandGuest, setExpandGuest] = useState(false);
  const [adult, setAdult] = useState(1);
  const [children, setChildren] = useState(0);
  const [responseMessage, setResponseMessage] = useState(null);
  const [bookingPrice, setBookingPrice] = useState(price);
  const [room, setRoom] = useState(1);

  let [startDate, endDate] = dateRange;
  const guestsMenu = useRef(null);
  const {
    setValue,
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  //Add enquiry to the api
  async function onSubmit(input) {
    setResponseMessage(null);
    const dates = document.querySelector("#date").value;
    let data = JSON.stringify({
      data: { hotel: hotel, name: input.guestName, email: input.email, date: dates, message: input.message, adult: input.adult, children: input.children, room: input.room, price: bookingPrice },
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
      if (response.ok) {
        reset();
        //Need some manual resets to, back to default values.
        setRoom(1);
        setChildren(0);
        setAdult(1);
        [startDate, endDate] = [null, null];

        setResponseMessage({ response: "success", message: "Thank you for your enquiry!" });
      } else {
        setResponseMessage({ response: "error", message: "Oh no! Something wrong happened!" });
      }
    } catch (error) {
      setResponseMessage({ response: "error", message: `Oh no! Following error occurred: ${error}` });
    }
  }

  //Close guestsMenu if clicked outside of the guests container
  document.addEventListener("mousedown", checkClick);
  function checkClick(event) {
    if (guestsMenu.current && expandGuest && !guestsMenu.current.contains(event.target)) {
      setExpandGuest(false);
    }
  }
  //Change guests input and handle restrictions on amount of adults vs rooms.
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
  //Smooth scroll to the top of the page
  useEffect(() => {
    window.scrollTo({ top: 50, behavior: "smooth" });
  }, []);

  //Need to setValue instead of register in their respective inputs, because of the custom build minus/plus interactions
  useEffect(() => {
    setValue("adult", adult);
    setValue("children", children);
    setValue("room", room);
    // eslint-disable-next-line
  }, [adult, children, room]);

  //Calculate BookingPrice
  useEffect(() => {
    let sumPrice = adult * price + parseInt(children * (price * 0.5));
    //Amount of nights, 8.64e7 milliseconds in 1 day.
    let days = (dateRange[1] - dateRange[0]) / 8.64e7;
    setValue("date", days);
    days = days >= 1 ? days : 1;
    setBookingPrice(sumPrice * days);
    // eslint-disable-next-line
  }, [adult, children, dateRange]);

  return (
    <div className="enquiries">
      <div className="background__img"></div>
      <div className="enquiries__content">
        <Header type="main" header="Reservation Enquiry" />
        {responseMessage && <ResponseMessage type={responseMessage.response} message={responseMessage.message} />}
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <div className="enquiries__input form__input--wrapper">
            <label htmlFor="name">Name</label>
            <input className="input name" id="name" type="text" {...register("guestName")} />
            {errors.guestName && <span className="error-input">{errors.guestName.message}</span>}
          </div>
          <div className="enquiries__input form__input--wrapper">
            <label htmlFor="email">Email</label>
            <input id="email" className="email input" type="email" {...register("email")} />
            {errors.email && <span className="error-input">{errors.email.message}</span>}
          </div>
          <div className="enquiries__date enquiries__input form__input--wrapper">
            <label htmlFor="date">Date</label>
            <DatePicker selectsRange={true} startDate={startDate} endDate={endDate} minDate={new Date()} onChange={(update) => setDateRange(update)} placeholderText="Check-in  -  Check-out" className="date input" id="date" />
            {errors.date && <span className="error-input">{errors.date.message}</span>}
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
            <textarea className="input" {...register("message")} rows="5" cols="20" placeholder="Comment on your booking (optional)" id="message" />
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
