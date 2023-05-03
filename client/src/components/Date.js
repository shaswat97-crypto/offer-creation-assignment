import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

function Datepicker({selectedDate, setSelectedDate}) {
  

  return (
    <div style={{display:'inline-block'}}>
      <DatePicker
        selected={selectedDate}
        onChange={date => setSelectedDate(date)}
        placeholderText="Never Expires"
      />
    </div>
  );
}

export default Datepicker;
