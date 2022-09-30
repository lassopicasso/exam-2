import React, { useContext } from "react";
import Header from "../../../common/Header";
import AuthContext from "../../../context/AuthContext";
import MessageList from "./MessageList";
import { useNavigate } from "react-router-dom";
import Head from "../../../common/Head";

function MessagePage() {
  const user = useContext(AuthContext)[0];
  const navigate = useNavigate();
  if (!user) {
    navigate("/");
  }
  return (
    <main>
      <Head title={user.user.username === "Admin" ? "Messages" : "Enquiries"} description={user.user.username === "Admin" ? "Read messages from the visitors" : "Read enquiries for your hotel"} addPostFixTitle={true} />
      <Header type="main" header={user.user.username === "Admin" ? "Messages" : "Enquiries"} />
      <MessageList user={user} />
    </main>
  );
}

export default MessagePage;
