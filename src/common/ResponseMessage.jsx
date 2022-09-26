import React from "react";

function ResponseMessage({ message, type }) {
  return <div className={`${type} response`}>{message}</div>;
}

export default ResponseMessage;
