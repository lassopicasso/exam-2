import React, { useContext } from "react";
import Header from "../../common/Header";
import AuthContext from "../../context/AuthContext";
import MessageList from "./MessageList";
import { useNavigate } from "react-router-dom";

function MessagePage() {
  const user = useContext(AuthContext)[0];
  const navigate = useNavigate();
  if (!user) {
    navigate("/");
  }

  return (
    <main>
      <Header type="main" header={user.user.username === "Admin" ? "Messages" : "Enquiries"} />
      <MessageList user={user} />
    </main>
  );
}

export default MessagePage;
