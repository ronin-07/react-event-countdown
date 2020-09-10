import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import "./Form.css";
import "date-fns";
import Grid from "@material-ui/core/Grid";
import DateFnsUtils from "@date-io/date-fns";
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from "@material-ui/pickers";
import Button from "@material-ui/core/Button";
import axios from "axios";
import Spinner from "../Spinner/Spinner";

const Form = (props) => {
  var tomorrow = new Date();
  tomorrow.setDate(new Date().getDate() + 1);
  const [val, setVal] = useState("");
  const [filled, setFilled] = useState(false);
  const [selectedDate, setSelectedDate] = useState(tomorrow.toDateString());
  const [loading, setLoading] = useState(false);
  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const onSubmitHandler = (e) => {
    e.preventDefault();
    setLoading(true);
    let curday = selectedDate.toString().split(" ").slice(1, 4).join(" ");
    console.log(curday);
    const event = {
      title: val,
      dateString: selectedDate.toString(),
      date: curday,
    };
    axios
      .post("https://event-countdown-94e7f.firebaseio.com/events.json", event)
      .then((res) => {
        props.close();
        setLoading(false);
        props.submit();
      })
      .catch((err) => {
        props.close();
        setLoading(false);
        alert(err.message);
      });
  };

  return (
    <form
      id="myform"
      className="root"
      autoComplete="off"
      onSubmit={onSubmitHandler}
    >
      {loading ? (
        <Spinner></Spinner>
      ) : (
        <React.Fragment>
          <h3>Add an Event</h3>
          <TextField
            style={{ marginBottom: "20px" }}
            fullWidth
            required
            error={!filled}
            id="standard-required"
            label="Event Name"
            value={val}
            onChange={(e) => {
              setVal(e.target.value);
              if (e.target.value) {
                setFilled(true);
              } else {
                setFilled(false);
              }
            }}
            helperText={!filled ? "Should not be empty." : ""}
            variant="outlined"
          />
          <MuiPickersUtilsProvider utils={DateFnsUtils}>
            <Grid container justify="space-around">
              <KeyboardDatePicker
                required
                disableToolbar
                variant="dialogue"
                format="dd/MM/yyyy"
                margin="normal"
                id="date-picker-inline"
                label="Date picker inline"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change date",
                }}
              />

              <KeyboardTimePicker
                margin="normal"
                id="time-picker"
                label="Time picker"
                value={selectedDate}
                onChange={handleDateChange}
                KeyboardButtonProps={{
                  "aria-label": "change time",
                }}
              />
            </Grid>
          </MuiPickersUtilsProvider>
          <div className="submitbtn">
            <Button type="submit" variant="contained">
              Add Event
            </Button>
          </div>
        </React.Fragment>
      )}
    </form>
  );
};

export default Form;
