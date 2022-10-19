import React, {useState} from 'react'

import {SORT_PARAMS} from "../../app/seriePanel/header/FilterAndSort";

import classes from './InputDropDown.module.css'
import inputStyles from './Input.module.css'

const InputDropDown = (props) => {

    const [enteredSelected, setEnteredSelected] = useState(JSON.stringify(SORT_PARAMS.BY_LAST_MODIFIED));

    let list = []
    Object.keys(props.optionList).forEach(function (key, index) {
        let element = props.optionList[key];
        list.push(element);
    })

    const onChange = (e) => {
        setEnteredSelected(e.target.value);
        let object = JSON.parse(e.target.value);
        console.log("Selected: " + e.target.value);
        props.onChange(object);
    }

    return (
        <select id={props.list}
                className={`${inputStyles.input} ${classes.option}`}
                onChange={onChange}
                value={enteredSelected}>
            {
                list.map((option, key) => (
                    <option value={JSON.stringify(option)} key={key}>{option.value}</option>
                ))
            }
        </select>
    );
}


export default InputDropDown;