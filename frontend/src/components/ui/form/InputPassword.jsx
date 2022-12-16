import React, {forwardRef, useImperativeHandle, useState} from 'react'

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import classes from './Input.module.css'
import IconBtn from "./IconBtn";
import useInput from "../../../hooks/use-input";


const InputPassword = forwardRef ((props, ref) => {
    const {initValue, name, maxLength, placeholder, validateFn} = props

    const [inputType, setInputType] = useState("password");
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
        reset: () => reset()
    }))

    const onHideClickHandler = (e) => {
        setInputType("text")
    }

    const onVisibleClickHandler = (e) => {
        setInputType("password")
    }

    return (
        <>
            <input
                className={`${classes.input} ${hasError && classes.error}`}
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
        </>
    );
})

export default InputPassword;