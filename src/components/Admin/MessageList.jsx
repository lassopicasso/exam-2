import React, { useEffect, useState } from "react";
import { apiEnquiry } from "../../constants/api";
import { apiContact } from "../../constants/api";
import EnquiryCard from "./EnquiryCard";
import ContactCard from "./ContactCard";
// import ResponseMessage from "../../common/ResponseMessage";

function MessageList({ user }) {
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [filterButton, setFilterButton] = useState("unread");
  // const [responseMessage, setResponseMessage] = useState(false);
  console.log(user.user.username);
  const apiMessages = user.user.username === "Admin" ? apiContact + "?populate=*" : apiEnquiry + "?populate=*";
  useEffect(() => {
    async function fetchData() {
      console.log(user.jwt);
      try {
        const response = await fetch(apiMessages, {
          headers: {
            Authorization: `Bearer ${user.jwt} `,
          },
        });
        console.log(response.status);
        if (response.ok) {
          const data = await response.json();
          let sortedMessages = data.data
            .map((message) => {
              return { ...message, date: new Date(message.attributes.publishedAt) };
            })
            .sort((a, b) => b.date - a.date);
          setMessages(sortedMessages);
          // console.log(sortedMessages);
          // console.log(messages.length);
          // console.log(messages.length === 0);

          // const messageArray = messages.filter((message) => message.attributes.read && filterButton === "unread");
          // console.log(messageArray);
          // if (messages.length === 0) {
          //   // setResponseMessage({ response: "info", message: `Oh no! :/ ${user.user.username === "Admin" ? `There are no messages to ${messages.read ? "unread" : "read"} here.` : `There are no enquiries to ${messages.read ? "unread" : "read"} here.`}` });
          // }
        } else {
          // setResponseMessage({ response: "error", message: `Oh no! :/ ${response.status === 401 ? "Please relogin and try again" : "An error occured"}` });
        }
      } catch (error) {
        // setResponseMessage({ response: "error", message: `Oh no! :/ Following error occured: ${error}` });
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  // if (error) {
  //   return (
  //     <main>
  //       <div>{error}</div>
  //     </main>
  //   );
  // }
  if (loading) {
    return (
      <main>
        <div>Loading...</div>
      </main>
    );
  }
  // console.log(responseMessage ? "true" : "no");
  return (
    <>
      <div className="messages">
        <div className="messages__buttons">
          <button
            className={`cta ${filterButton === "unread" ? "" : "cta__bad"}`}
            onClick={() => {
              setFilterButton("unread");
            }}
          >
            Not Read
          </button>
          <button className={`cta ${filterButton === "read" ? "" : "cta__bad"}`} onClick={() => setFilterButton("read")}>
            Read
          </button>
        </div>
        <div className="messages__list">
          {/* {responseMessage && <ResponseMessage type={responseMessage.response} message={responseMessage.message} />} */}
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
