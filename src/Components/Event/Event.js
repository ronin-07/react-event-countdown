import React, { useState, useEffect } from "react";
import "./Event.css";
import CancelIcon from "@material-ui/icons/Cancel";

const Event = (props) => {
  const [days, setDays] = useState(0);
  const [hours, setHours] = useState(0);
  const [mins, setMins] = useState(0);
  const [secs, setSecs] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      let obj = getTime();
      setDays(obj.days)
      setHours(obj.hours);
      setMins(obj.mins);
      setSecs(obj.secs);
    }, 1000);
  });

  const getTime = () => {
    let cur = new Date().getTime();
    let distance = Math.round((props.time - cur) / 1000);
    let day = Math.floor(distance / 86400)
    let hour = Math.floor((distance / 3600) % 24);
    let min = Math.floor((distance / 60) % 60);
    let sec = Math.floor(distance % 60);
    return {
      days: day,
      hours: hour,
      mins: min,
      secs: sec,
    };
  };

  return (
    <div className="body">
      <div className="event">
        <CancelIcon
          style={{
            position: "absolute",
            right: "6px",
            top: "6px",
            fontSize: "30px",
            cursor: "pointer",
            color: "#66bfbf",
          }}
          onClick={() => props.delHandler(props.keyid)}
        ></CancelIcon>
        <div className="event__title">{props.title}</div>
        <div className="event__time">
          <div className="event__days">
            {days} <span>days</span>
          </div>
          <div className="event__hours">
            {hours} <span>hours</span>
          </div>
          <div className="event__mins">
            {mins} <span>minutes</span>
          </div>
          <div className="event__secs">
            {secs} <span>seconds</span>
          </div>
        </div>
        <div className="event__date">{props.date}</div>
      </div>
    </div>
  );
};

export default Event;
