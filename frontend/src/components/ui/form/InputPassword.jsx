import React, {useState} from 'react'

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import classes from './Input.module.css'
import IconBtn from "./IconBtn";


const InputPassword = (props) => {

    const [inputType, setInputType] = useState("password");

    const onChangeHandler = (e) => {
        props.onChange(e.target.value)
    }

    const onHideClickHandler = (e) => {
        setInputType("text")
    }

    const onVisibleClickHandler = (e) => {
        setInputType("password")
    }

    return (
        <>
            <input
                className={`${classes.input} ${props.error && classes.error}`}
                type={inputType}
                name="pwd"
                maxLength="50"
                placeholder="Password"
                onChange={onChangeHandler}
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
}

export default InputPassword;