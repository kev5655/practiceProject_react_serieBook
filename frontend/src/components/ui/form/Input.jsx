import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react'

import classes from "./Input.module.css"
import useInput from "../../../hooks/use-input";
import {defaultValidator} from "../../../utils/Validation";

let isInit = true;

const Input = forwardRef((props, ref) => {
    const {initValue, type, name, maxLength, minNumber, placeholder, validateObj, backendValidator, onChange} = props

    const {
        value,
        validator,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        inputFocusHandler,
        reset,
    } = useInput(initValue ?? '', validateObj ?? new defaultValidator(), backendValidator);

    const [displayError, setDisplayError] = useState({isError: false, text: ''});

    useEffect(() => {
        if (isInit) {
            isInit = false;
            return;
        }
        if (onChange !== undefined) {
            onChange(value);
        }
    }, [value])

    useImperativeHandle(ref, () => ({
        isValid: validator.isValid,
        value: value,
        onSubmit: () => {
            setDisplayError({isError: !validator.isValid, text: validator.getErrorText()})
        },
        reset: () => reset()
    }));


    return (
        <>
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
            {displayError.isError &&
                <p>
                    {displayError.text}
                </p>
            }
        </>
    );
})

export default Input;