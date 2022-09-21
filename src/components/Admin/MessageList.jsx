import React, { useEffect, useState } from "react";
import { apiEnquiry } from "../../constants/api";
import { apiContact } from "../../constants/api";
import EnquiryCard from "./EnquiryCard";
import ContactCard from "./ContactCard";

function MessageList({ user }) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState([]);
  const [filterButton, setFilterButton] = useState("unread");
  console.log(user.user.username);
  const apiMessages = user.user.username === "Admin" ? apiContact + "?populate=*" : apiEnquiry + "?populate=*";
  useEffect(() => {
    async function fetchData() {
      console.log(user.jwt);
      try {
        // const response = await fetch(apiMessages);
        // console.log(response);
        const response = await fetch(apiMessages, {
          headers: {
            Authorization: `Bearer ${user.jwt} `,
          },
        });
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          let sortedMessages = data.data
            .map((message) => {
              return { ...message, date: new Date(message.attributes.publishedAt) };
            })
            .sort((a, b) => b.date - a.date);
          setMessages(sortedMessages);
        }
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
    // eslint-disable-next-line
  }, []);

  if (error) {
    return (
      <main>
        <div>{error}</div>
      </main>
    );
  }
  if (loading) {
    return (
      <main>
        <div>Loading...</div>
      </main>
    );
  }
  console.log(messages);
  return (
    <div className="messages">
      <div className="messages__buttons">
        <button className={`cta ${filterButton === "unread" ? "" : "cta__bad"}`} onClick={() => setFilterButton("unread")}>
          Not Read
        </button>
        <button className={`cta ${filterButton === "read" ? "" : "cta__bad"}`} onClick={() => setFilterButton("read")}>
          Read
        </button>
      </div>
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
  );
}

export default MessageList;
