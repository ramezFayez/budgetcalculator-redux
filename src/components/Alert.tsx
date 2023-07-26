import React from "react";

const Alert = ({ type, text}:{type: string , text: string})=> {
  return <div className={`alert alert-${type}`}>{text}</div>;
};

export default Alert;
