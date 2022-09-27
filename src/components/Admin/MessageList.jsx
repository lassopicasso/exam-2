import React, { useEffect, useState } from "react";
import { apiEnquiry } from "../../constants/api";
import { apiContact } from "../../constants/api";
import EnquiryCard from "./EnquiryCard";
import ContactCard from "./ContactCard";
import ResponseMessage from "../../common/ResponseMessage";

function MessageList({ user }) {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [filterButton, setFilterButton] = useState("unread");
  const [responseMessage, setResponseMessage] = useState(null);
  const apiMessages = user.user.username === "Admin" ? apiContact + "?populate=*" : apiEnquiry + "?populate=*";
  useEffect(() => {
    async function fetchData() {
      try {
        const response = await fetch(apiMessages, {
          headers: {
            Authorization: `Bearer ${user.jwt} `,
          },
        });
        if (response.ok) {
          const data = await response.json();
          let sortedMessages = data.data
            .map((message) => {
              return { ...message, date: new Date(message.attributes.publishedAt) };
            })
            .sort((a, b) => b.date - a.date);
          setMessages(sortedMessages);
          const amountMessages = sortedMessages.filter((message) => message.attributes.read === false);
          if (amountMessages.length === 0) {
            setResponseMessage({ response: "info", message: `There are no unread ${user.user.username === "Admin" ? "messages." : "enquiries."}` });
          }
        } else {
          setResponseMessage({ response: "error", message: `Oh no! :/ ${response.status === 401 ? "Please relogin and try again" : "An error occured"}` });
        }
      } catch (error) {
        setResponseMessage({ response: "error", message: `Oh no! :/ Following error occured: ${error}` });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setResponseMessage(null);
    const messagesContainer = document.querySelector(".messages__list") !== null && document.querySelector(".messages__list").childElementCount;
    if (messagesContainer === 0) {
      setResponseMessage({ response: "info", message: `No ${filterButton} ${user.user.username === "Admin" ? "messages" : "enquiries"}.` });
    }
    // eslint-disable-next-line
  }, [filterButton]);

  if (loading) {
    return (
      <main>
        <div>Loading...</div>
      </main>
    );
  }

  return (
    <>
      <div className="messages">
        <div className="messages__buttons">
          <button className={`cta ${filterButton === "unread" ? "" : "cta__bad"}`} onClick={() => setFilterButton("unread")}>
            Not Read
          </button>
          <button className={`cta ${filterButton === "read" ? "" : "cta__bad"}`} onClick={() => setFilterButton("read")}>
            Read
          </button>
        </div>
        {responseMessage && <ResponseMessage type={responseMessage.response} message={responseMessage.message} />}
        <div className="messages__list">
          {user.user.username === "Admin"
            ? messages.map((contact, index) => {
                return <ContactCard contact={contact} user={user} filter={filterButton} key={index} />;
              })
            : messages.map((enquiry, index) => {
                return <EnquiryCard enquiry={enquiry} user={user} filter={filterButton} key={index} />;
              })}
        </div>
      </div>
    </>
  );
}

export default MessageList;
