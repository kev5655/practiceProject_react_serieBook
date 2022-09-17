import React, {useState} from 'react'

import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import VisibilityIcon from '@mui/icons-material/Visibility';

import './InputPassword.css'


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
                className="passwordInput"
                type={inputType}
                name="pwd"
                maxLength="50"
                placeholder="Password"
                onChange={onChangeHandler}
            />
            {
                inputType === "password" && <VisibilityIcon
                    className="icon"
                    onClick={onHideClickHandler}
                />
            }

            {
                inputType === "text" && <VisibilityOffIcon
                    className="icon"
                    onClick={onVisibleClickHandler}
                />
            }
        </>
    );
}

export default InputPassword;

