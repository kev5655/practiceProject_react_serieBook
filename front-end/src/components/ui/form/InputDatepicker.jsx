import React, {useState} from 'react'

import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

import './InputDatepicker.css'

const InputDatepicker = (props) => {

    let date = props.value === '' ? '' : new Date(props.value);
    const [startDate, setStartDate] = useState(date);

    const onChangeHandler = (date) => {
        setStartDate(date);
        props.onChange(date);
    }

    return (
        <DatePicker
            selected={startDate}
            placeholderText={props.label}
            dateFormat="dd/MM/yyyy"
            onChange={onChangeHandler}
        />
    )
}

export default InputDatepicker;