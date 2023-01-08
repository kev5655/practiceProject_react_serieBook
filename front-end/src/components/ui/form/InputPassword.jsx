import React, {forwardRef, useImperativeHandle, useState} from 'react'

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import classes from './Input.module.css'
import IconBtn from "./IconBtn";
import useInput from "../../../hooks/use-input";
import {defaultValidator} from "../../../utils/Validation";


const InputPassword = forwardRef((props, ref) => {
    let {
        initValue,
        name,
        maxLength,
        placeholder,
        validator,
        onChange,
        onFocus,
        onBlur
    } = props

    initValue = initValue ?? "";
    validator = validator ?? new defaultValidator();
    function empty() {};
    onChange = onChange ?? empty;
    onFocus = onFocus ?? empty;
    onBlur = onBlur ?? empty;

    const [inputType, setInputType] = useState("password");
    const {
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
    }))

    const onHideClickHandler = (e) => {
        setInputType("text")
    }

    const onVisibleClickHandler = (e) => {
        setInputType("password")
    }

    return (
        <>
            <div className={classes.password_container}>
                <input
                    className={`${classes.input} ${hasError && classes.error} ${displayError.isError && classes.error}`}
                    type={inputType}
                    name={name}
                    value={value}
                    maxLength={maxLength ?? 50}
                    placeholder={placeholder ?? ''}
                    onChange={valueChangeHandler}
                    onBlur={inputBlurHandler}
                    onFocus={inputFocusHandler}
                />
                {

                    inputType === "password" && <IconBtn
                        icon={VisibilityIcon}
                        className={classes.icon}
                        onClick={onHideClickHandler}/>
                }
                {
                    inputType === "text" && <IconBtn
                        icon={VisibilityOffIcon}
                        className={classes.icon}
                        onClick={onVisibleClickHandler}/>
                }
            </div>
            {displayError.isError &&
                <p>
                    {displayError.text}
                </p>
            }
        </>
    );
})

export default InputPassword;