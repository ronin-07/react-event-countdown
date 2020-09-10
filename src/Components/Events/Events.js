import React, { useState, useEffect } from "react";
import classes from "./Events.module.css";
import AddCircleOutlineIcon from "@material-ui/icons/AddCircleOutline";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Form from "../Form/Form";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Event from "../Event/Event";

const Events = (props) => {
  const [openForm, setOpenForm] = useState(false);
  const [events, setEvents] = useState([]);
  const [submitted, setsubmitted] = useState(false);

  const handleClose = () => {
    setOpenForm(false);
  };
  const handleToggle = () => {
    setsubmitted(true);
    setOpenForm(!openForm);
  };

  const setKey = (key, obj) => {
    const newObj = { ...obj, key: key };
    return newObj;
  };

  const deleteHandler=(key)=>{
    const newEvent=events.filter((cur)=>cur.key!==key);
    setEvents(newEvent);
  }

  useEffect(() => {
    axios
      .get("https://event-countdown-94e7f.firebaseio.com/events.json")
      .then((res) => {
        if (res.data) {
          console.log(res.data);
          const arr = [];
          for (const [k, v] of Object.entries(res.data)) {
            arr.push(setKey(k, v));
          }
          setEvents(arr);
        }
      });
  }, [submitted]);

  return (
    <React.Fragment>
      <div className={classes.eventsWrapper}>
        <div className={classes.events}>
          {events.length > 0 ? (
            events.map((event) => (
              <Event
                key={event.key}
                keyid={event.key}
                title={event.title}
                date={event.date}
                time={new Date(event.dateString)}
                delHandler={(k)=>deleteHandler(k)}
              ></Event>
            ))
          ) : (
            <p className={classes.text}>Nothing To Remember !</p>
          )}
        </div>
        <div className={classes.buttons}>
          <Button
            variant="contained"
            onClick={handleToggle}
            className={classes.btn}
            endIcon={
              <AddCircleOutlineIcon
                style={{ color: "#e0ece4", fontSize: "26px" }}
              ></AddCircleOutlineIcon>
            }
          >
            Add New Event
          </Button>
        </div>
      </div>
      <Modal
        className="modal"
        open={openForm}
        onClose={handleClose}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={openForm}>
          <Form submit={() => setsubmitted(false)} close={handleClose}></Form>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default Events;
