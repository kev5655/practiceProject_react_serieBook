import React, {useEffect, useState} from 'react'

import InputText from "../../ui/form/InputText";
import InputPassword from "../../ui/form/InputPassword";
import Btn from "../../ui/form/Btn";

import {fetchData} from "../../utils/api";

import classes from "./SingUpForm.module.css";

const SingUpFrom = (props) => {

    const [enteredUsername, setEnteredUsername] = useState({value: "", valid: true});
    const [enteredEmail, setEnteredEmail] = useState({value: "", valid: true}); //{value: "", valid: false}
    const [enteredPassword, setEnteredPassword] = useState({value: "", valid: true});
    const [error, setError] = useState({value: false, msg: ""});

    const usernameHandler = (enteredValue) => {
        //setEnteredUsername(prevState => ({...prevState, value: enteredValue}))
        setEnteredUsername({value: enteredValue, valid: enteredUsername.valid})
    }

    useEffect(() => {
        const identifier = setTimeout(async () => {
            let body = JSON.stringify({username: enteredUsername.value});
            let response = await fetchData('/api/user/available/', 'Post', body, 'application/json');
            console.log("useEffect");
            //setEnteredUsername(prevState => ({...prevState, valid: response.isUserAvailable}))
            setEnteredUsername({value: enteredUsername.value, valid: response.isUserAvailable});
        }, 500);

        return () => {
            clearTimeout(identifier);
        };
    }, [enteredUsername.value]);

    const emailHandler = (enteredValue) => {
        //setEnteredEmail(prevState => ({...prevState, value: enteredValue}));
        setEnteredEmail({value: enteredValue, ...enteredEmail})
    }

    const passwordHandler = (enteredValue) => {
        //setEnteredPassword(prevState => ({...prevState, value: enteredValue}))
        setEnteredPassword({value: enteredValue, valid: enteredPassword.valid})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        validateForm();
        const loggingValue = {
            username: enteredUsername,
            password: enteredPassword,
            email: enteredEmail
        }
        if(enteredUsername.valid && enteredPassword.valid && enteredEmail.valid){
            console.log("Sing Up user: ", loggingValue);
            setError({value: false, msg:""});
            props.onSingUp(loggingValue);
        } else if(!enteredUsername.valid) {
            setError({value: true, msg:"User Name ist not Available"});
        } else if(!enteredPassword.valid) {
             setError({value: true, msg:"Password is to short"});
        } else {
            setError({value: true, msg:"Incorrect Email"});
        }
    }

    const validateForm = () => {
        let isValid = enteredUsername.value !== "";
        //setEnteredUsername(prevState => ({...prevState, valid: isValid}));
        //setEnteredUsername({...enteredUsername, valid: isValid})
        setEnteredUsername({value: enteredUsername.value, valid: isValid});

        isValid = enteredEmail.value.indexOf('@') !== -1;
        //setEnteredEmail(prevState => ({...prevState, valid: false}));
        // setEnteredEmail({...setEnteredEmail, valid: isValid})
        setEnteredEmail({value: enteredEmail.value, valid: false})
        setEnteredEmail({})

        isValid = enteredPassword.value > 4;
        //setEnteredPassword(prevState => ({...prevState, valid: false}));
        //setEnteredPassword({...enteredPassword, valid: enteredPassword.value > 4})
        setEnteredPassword({value: enteredPassword.value, valid: isValid});
    }

    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <div>
                <InputText
                    error={! enteredUsername.valid}
                    placeholder='Username'
                    onChange={usernameHandler}/>
            </div>
            <div className={classes.form_email}>
                <InputText
                    error={! enteredEmail.valid}
                    placeholder='Email'
                    onChange={emailHandler}/>
            </div>
            <div className={classes.form_password}>
                <InputPassword
                    error={! enteredPassword.valid}
                    onChange={passwordHandler}
                />
            </div>
            {
                error.value && <p className={classes.form_errorMsg}>{error.msg}</p>
            }
            <div className={classes.form_button}>
                <Btn
                    label="Sing Up"
                    submitValue='submit'
                    className={{
                        width: '50%',
                    }}
                />
            </div>
        </form>
    )
}

export default SingUpFrom;