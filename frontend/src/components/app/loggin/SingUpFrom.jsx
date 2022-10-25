import React, {useEffect, useState} from 'react'

import InputText from "../../ui/form/InputText";
import InputPassword from "../../ui/form/InputPassword";
import Btn from "../../ui/form/Btn";

import {fetchData} from "../../utils/api";

import classes from "./SingUpForm.module.css";

const NOT_FOUND = -1;

const SingUpFrom = (props) => {

    const [enteredUsername, setEnteredUsername] = useState({value: "", valid: true});
    const [enteredEmail, setEnteredEmail] = useState({value: "", valid: true}); //{value: "", valid: false}
    const [enteredPassword, setEnteredPassword] = useState({value: "", valid: true});
    const [errorDisplayer, setErrorDisplayer] = useState({value: false, msg: ""});


    const usernameHandler = (enteredValue) => {
        setEnteredUsername(prevState => ({...prevState, value: enteredValue}))
        //setEnteredUsername({value: enteredValue, valid: enteredUsername.valid})
    }

    useEffect(() => {
        const identifier = setTimeout(async () => {
            let body = JSON.stringify({username: enteredUsername.value});
            let response = await fetchData('/api/user/available/', 'Post', body);
            console.log("Is User Valid: " + response.isUserAvailable);
            //setEnteredUsername(prevState => ({...prevState, valid: response.isUserAvailable}))
            setEnteredUsername({value: enteredUsername.value, valid: response.isUserAvailable});
        }, 500);

        return () => {
            clearTimeout(identifier);
        };
    }, [enteredUsername.value]);

    const emailHandler = (enteredValue) => {
        setEnteredEmail(prevState => ({...prevState, value: enteredValue}));
        //setEnteredEmail({value: enteredValue, ...enteredEmail})
    }

    const passwordHandler = (enteredValue) => {
        setEnteredPassword(prevState => ({...prevState, value: enteredValue}))
        //setEnteredPassword({value: enteredValue, valid: enteredPassword.valid})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        let error = validateForm();
        const loggingValue = {
            username: enteredUsername,
            password: enteredPassword,
            email: enteredEmail
        }
        console.log("error is", error);
        if(! error.available){
            console.log("Sing Up user: ", loggingValue);
            setErrorDisplayer({value: false, msg:""});
            //props.onSingUp(loggingValue);
        } else {
            setErrorDisplayer({value: true, msg: error.msgs.length === 1 ? error.msgs[0] : "Please enter the correct information"});
        }
    }

    const validateForm = () => {
        let error = {available: false, msgs: []};
        if(enteredUsername.value === ""){
            console.log("Username is Empty");
            setEnteredUsername(prevState => ({...prevState, valid: false}));
            error.available = true;
            error.msgs.push("Username is Empty");
        } else {
            setEnteredUsername(prevState => ({...prevState, valid: true}));
        }

        if(enteredEmail.value.indexOf('@') === NOT_FOUND){
            console.log("Email is Incorrect");
            setEnteredEmail(prevState => ({...prevState, valid: false}));
            console.log(error.msg)
            error.available = true;
            error.msgs.push("Incorrect Email");
        } else {
            setEnteredEmail(prevState => ({...prevState, valid: true}));
        }


        if(enteredPassword.value.length < 4){
            console.log("Password ist to Short");
            setEnteredPassword(prevState => ({...prevState, valid: false}));
            error.available = true;
            error.msgs.push("Password is to short");
        } else {
            setEnteredPassword(prevState => ({...prevState, valid: true}));
        }

        return error
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
                errorDisplayer.value && <p className={classes.form_errorMsg}>{errorDisplayer.msg}</p>
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