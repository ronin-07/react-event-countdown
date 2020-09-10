import React, { useState } from "react";
import AddBoxIcon from "@material-ui/icons/AddBox";
import Modal from "@material-ui/core/Modal";
import Backdrop from "@material-ui/core/Backdrop";
import Fade from "@material-ui/core/Fade";
import Form from "../Form/Form";
import Button from "@material-ui/core/Button";
import './Events.css'

const Events = (props) => {
  const [openForm, setOpenForm] = useState(false);
  const [events, setEvents] = useState([{}]);
  const handleClose = () => {
    setOpenForm(false);
  };
  const handleToggle = () => {
    setOpenForm(!openForm);
  };
  return (
    <React.Fragment>
      {events.length > 0 ? (
        <div className="initText">
          <p className="text">Nothing To Remember !</p>
          <Button variant="contained" onClick={handleToggle}>
            Add a New Event
          </Button>
        </div>
      ) : (
        "bla"
      )}
      {/* <AddBoxIcon
        style={{
          fontSize: "60px",
          marginLeft: "30px",
          color: "#ff4b5c",
          cursor: "pointer",
        }}
        onClick={handleToggle}
      ></AddBoxIcon> */}
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
          <Form></Form>
        </Fade>
      </Modal>
    </React.Fragment>
  );
};

export default Events;
