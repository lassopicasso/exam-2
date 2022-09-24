import React, { useState, useEffect } from "react";
import moment from "moment/moment";
import Header from "../../common/Header";
import { apiContact } from "../../constants/api";

function ContactCard(props) {
  const [readMore, setReadMore] = useState(false);
  const [read, setRead] = useState(props.contact.attributes.read);
  console.log(props.contact);
  const date = moment(props.contact.attributes.publishedAt).format("MMM Do YYYY, h:mm a");
  const subject = props.contact.attributes.subject;
  const name = props.contact.attributes.name;
  const email = props.contact.attributes.email;
  const message = props.contact.attributes.message;
  const id = props.contact.id;
  const api = apiContact + "/" + id;

  useEffect(() => {
    async function updateRead() {
      let data = JSON.stringify({
        data: { read: read },
      });
      console.log(data);
      const options = {
        method: "PUT",
        body: data,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${props.user.jwt} `,
        },
      };
      try {
        const response = await fetch(api, options);
        console.log(response);
        setReadMore(false);
      } catch (error) {
        console.log(error);
      }
    }
    updateRead();
    // eslint-disable-next-line
  }, [read]);

  if (props.filter === "unread" && read === true) {
    return "";
  }
  if (props.filter === "read" && read === false) {
    return "";
  }

  return (
    <div className="messages__card">
      <div className="messages__card--wrapper">
        <div>
          <div>{date}</div>
        </div>
        <Header type="sub" header={subject} />
        <div>
          <span>Name:</span> {name}
        </div>
        <div>
          <span>Email:</span> {email}
        </div>
        {readMore ? (
          <>
            <div>
              <span>Message:</span> {message}
            </div>
            <div className="messages__buttons">
              <button className="cta" onClick={() => setRead(!read)}>
                {props.filter === "read" ? "Not read" : "Mark as read"}
              </button>
              <button className="cta" onClick={() => setReadMore(false)}>
                Hide
              </button>
            </div>
            <a className="cta" href={`mailto:${email}`}>
              Answer
            </a>
          </>
        ) : (
          <button className="cta" onClick={() => setReadMore(true)}>
            Read message
          </button>
        )}
      </div>
    </div>
  );
}

export default ContactCard;
