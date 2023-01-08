import React, {forwardRef, useEffect, useImperativeHandle, useState} from 'react'

import classes from "./Input.module.css"
import useInput from "../../../hooks/use-input";
import {defaultValidator} from "../../../utils/Validation";


const Input = forwardRef((props, ref) => {
    let { initValue,
        type,
        name,
        maxLength,
        minNumber,
        placeholder,
        validateOnRuntime,
        validateOnSubmitting,
        backendValidator,
        onChange,
        onFocus,
        onBlur } = props

    initValue = initValue ?? "";
    validateOnRuntime = validateOnRuntime ?? new defaultValidator();
    validateOnSubmitting = validateOnSubmitting ?? new defaultValidator();
    onChange = onChange ?? function (){};
    onFocus = onFocus ?? function (){};
    onBlur = onBlur ?? function (){};

    let {
        value,
        hasRuntimeError,
        isValidInBackend,
        valueChangeHandler,
        inputBlurHandler,
        inputFocusHandler,
        resetHandler,
    } = useInput({initValue,
        validate: validateOnRuntime,
        backendValidator,
        onChange,
        onFocus,
        onBlur});

    const [displayError, setDisplayError] = useState({isError: false, text: ''});


    useImperativeHandle(ref, () => ({
        value: value,
        onSubmit: () => {
            let isValid = validateOnSubmitting.validate(value) &&
                (backendValidator === undefined ? true : isValidInBackend);
            let errorMessage = validateOnSubmitting.getErrorText();
            setDisplayError({isError: !isValid, text: errorMessage})
            return isValid
        },
        reset: () => {
            resetHandler()
            setDisplayError({isError: false, text: ''})
        }
    }));


    return (
        <>
            <input
                className={`${classes.input} ${hasRuntimeError && classes.error} ${displayError.isError && classes.error}`}
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