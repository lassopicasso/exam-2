import React from "react";

//When form is submitted, error occures, or similiar thing occurs.
function ResponseMessage({ message, type }) {
  return <div className={`${type} response`}>{message}</div>;
}

export default ResponseMessage;
