import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react'

import classes from "./Input.module.css"
import useInput from "../../../hooks/use-input";
import {defaultValidator} from "../../../utils/Validation";

let isInit = true;

const Input = forwardRef((props, ref) => {
    let { initValue,
        type,
        name,
        maxLength,
        minNumber,
        placeholder,
        validateObj,
        backendValidator,
        onChange,
        onFocus,
        onBlur } = props

    initValue = initValue ?? "";
    validateObj = validateObj ?? new defaultValidator()
    onChange = onChange ?? function (){};
    onFocus = onFocus ?? function (){};
    onBlur = onBlur ?? function (){};

    const {
        value,
        validator,
        hasError,
        valueChangeHandler,
        inputBlurHandler,
        inputFocusHandler,
        resetHandler,
    } = useInput({initValue,
        validateObj,
        backendValidator,
        onChange,
        onFocus,
        onBlur});

    const [displayError, setDisplayError] = useState({isError: false, text: ''});

    useImperativeHandle(ref, () => ({
        value: value,
        isValid: validator.isValid,
        onSubmit: () => {
            setDisplayError({isError: !validator.isValid, text: validator.getErrorText()})
        },
        reset: () => resetHandler()
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