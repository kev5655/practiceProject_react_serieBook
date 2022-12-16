import React, {useState} from 'react'

import inputStyles from "./Input.module.css";



const InputNumber = (props) => {

    const [number, setNumber] = new useState(props.value ?? "");

    const onChangeHandler = (e) => {
        let value = e.target.value
        setNumber(value)
        if(isValid(value)){
            props.onChange(value)
        } else {
            setNumber(1);
        }
    }

    const isValid = (value) => {
        if (value === '') return true
        return parseInt(value) >= 1;
    }

    return(
        <input
            className={`${inputStyles.input} 
                ${props.error && inputStyles.error}`}
            type='number'
            min='1'
            name="pwd"
            maxLength="50"
            value={number}
            placeholder={props.placeholder}
            onChange={onChangeHandler}
        />
    );
}

//export default InputNumber;