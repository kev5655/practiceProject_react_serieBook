import React, {forwardRef, useImperativeHandle, useState} from 'react'

import classes from "./Input.module.css"
import useInput from "../../../hooks/use-input";

const Input = forwardRef((props, ref) => {
    const {initValue, type, name, maxLength, minNumber, placeholder, validateFn} = props

    const {
        value,
        isValid,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        inputFocusHandler,
        reset,
    } = useInput(initValue ?? '', validateFn ?? (() => true));

    useImperativeHandle(ref, () => ({
        isValid: isValid,
        value: value,
        reset: () => reset(),
    }));


    return (
        <input
            className={`${classes.input} ${hasError && classes.error}`}
            type={type}
            name={name}
            value={value}
            maxLength={maxLength ?? 50}
            min={minNumber}
            placeholder={placeholder ?? ''}
            onChange={valueChangeHandler}
            onBlur={inputBlurHandler}
            onFocus={inputFocusHandler}
        />
    );
})

export default Input;