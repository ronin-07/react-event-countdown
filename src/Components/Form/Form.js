import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import "./Form.css";
import 'date-fns';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import {
  MuiPickersUtilsProvider,
  KeyboardTimePicker,
  KeyboardDatePicker,
} from '@material-ui/pickers';


const Form = (props) => {
  const [val, setVal] = useState("");
  const [filled, setFilled] = useState(false);
  const [selectedDate, setSelectedDate] = useState(new Date().toLocaleDateString());

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  return (
    <React.Fragment>
      
      <form className="root" autoComplete="off">
        <h3>Add an Event</h3>
        <TextField
        style={{marginBottom: "40px"}}
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
              variant="inline"
              format="dd/MM/yyyy"
              margin="normal"
              id="date-picker-inline"
              label="Date picker inline"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change date',
              }}
            />
            
            <KeyboardTimePicker
              margin="normal"
              id="time-picker"
              label="Time picker"
              value={selectedDate}
              onChange={handleDateChange}
              KeyboardButtonProps={{
                'aria-label': 'change time',
              }}
            />
          </Grid>
        </MuiPickersUtilsProvider>
      </form>
    </React.Fragment>
  );
};

export default Form;
