import React, {forwardRef, useImperativeHandle, useState} from 'react'

import classes from "./Input.module.css"
import classError from "../../styles/Error.module.css"
import useInput from "../../../hooks/use-input";
import {defaultValidator} from "../../../utils/Validation";
import IconBtn from "./IconBtn";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";


const Input = forwardRef((props, ref) => {
    let {
        initValue,
        type,
        name,
        maxLength,
        minNumber,
        placeholder,
        isPassword,
        validator,
        backendValidator,
        onChange,
        onFocus,
        onBlur
    } = props

    initValue = initValue ?? "";
    validator = validator ?? new defaultValidator();
    onChange = onChange ?? (() => {});
    onFocus = onFocus ?? (() => {});
    onBlur = onBlur ?? (() => {});

    let {
        value,
        hasError,
        validation,
        valueChangeHandler,
        inputBlurHandler,
        inputFocusHandler,
        resetHandler,
    } = useInput({
        initValue,
        validator,
        backendValidator,
        onChange,
        onFocus,
        onBlur
    });

    const [displayError, setDisplayError] = useState({isError: false, text: ''});


    useImperativeHandle(ref, () => ({
        value: value,
        onSubmit: () => {
            setDisplayError({isError: !validation.isValid, text: validation.getErrorText()})
            return validation.isValid
        },
        reset: () => {
            resetHandler()
            setDisplayError({isError: false, text: ''})
        }
    }));

    // For Password Input Filed
    const [inputType, setInputType] = useState(type);

    const onHideClickHandler = () => {
        setInputType("text")
    }

    const onVisibleClickHandler = () => {
        setInputType("password")
    }


    return (
        <>
            <div className={classes.input_container}>
                <input
                    className={`${classes.input} ${hasError && classes.error}`}
                    type={inputType}
                    name={name}
                    value={value}
                    maxLength={maxLength ?? 50}
                    min={minNumber}
                    placeholder={placeholder ?? ''}
                    onChange={valueChangeHandler}
                    onBlur={inputBlurHandler}
                    onFocus={inputFocusHandler}
                />
                {

                    (isPassword && inputType === "password") && <IconBtn
                        icon={VisibilityIcon}
                        className={classes.icon}
                        onClick={onHideClickHandler}/>
                }
                {
                    (isPassword && inputType === "text") && <IconBtn
                        icon={VisibilityOffIcon}
                        className={classes.icon}
                        onClick={onVisibleClickHandler}/>
                }
                {displayError.isError &&
                    <p className={`${classError.error_message} ${classes.error_text}`}>
                        {displayError.text}
                    </p>
                }
            </div>


        </>
    );
})

export default Input;