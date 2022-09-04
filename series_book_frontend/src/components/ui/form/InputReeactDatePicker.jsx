import React, {useState} from 'react'

import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

import './InputReactDatePicker.css'

const InputReeactDatePicker = (props) => {

    let defaultValue = ""
    if (props.value !== undefined) {
        defaultValue = props.value.getDate() + '/' + props.value.getMonth + '/' + props.value.getFullYear()
    }

    const [startDate, setStartDate] = useState(defaultValue);

    return (
        <DatePicker
            selected={startDate}
            placeholderText={'Please select a date'}
            dateFormat="dd/MM/yyyy"
            onChange={(date) => setStartDate(date)} />
    )
}

export default InputReeactDatePicker;