import React, {useState} from 'react'

import DatePicker from 'react-datepicker';

import "react-datepicker/dist/react-datepicker.css";

import './InputDatepicker.css'

const InputDatepicker = (props) => {

    //ToDo vereinfachen
    let date = props.value
    let defaultDateValue = ""
    let defaultDayValue = undefined;
    let defaultMonthValue = undefined;
    let defaultYearValue = undefined;
    if (props.value !== undefined) {
        defaultDayValue = date.getDate();
        defaultMonthValue = date.getMonth();
        defaultYearValue = date.getFullYear();
        defaultDateValue = new Date(defaultYearValue, defaultMonthValue,defaultDayValue);
    }

    const [startDate, setStartDate] = useState(defaultDateValue);

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