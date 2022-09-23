import React, {useState} from 'react'
import InputText from "../../ui/form/InputText";
import InputPassword from "../../ui/form/InputPassword";

import classes from "./LoggingForm.module.css"
import Btn from "../../ui/form/Btn";

const LoggingForm = (props) => {

    const [enteredUsername, setEnteredUsername] = useState();
    const [enteredPassword, setEnteredPassword] = useState();


    const usernameHandler = (value) => {
        setEnteredUsername(value)
    }

    const passwordHandler = (value) => {
        setEnteredPassword(value)
    }

    const submitHandler = (e) => {
        e.preventDefault()
        const loggingValue = {
            username: enteredUsername,
            password: enteredPassword
        }

        props.onLogging(loggingValue)
    }


    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div className={classes.form_username}>
                <InputText
                    placeholder='Username'
                    onChange={usernameHandler}/>
            </div>
            <div className={classes.form_password}>
                <InputPassword
                    onChange={passwordHandler}
                />
            </div>
            <div className={classes.form_button}>
                <Btn
                    label="Logging"
                    submitValue='submit'
                    className={{
                        width: '50%',
                    }}
                />
            </div>
        </form>
    );
}

export default LoggingForm;