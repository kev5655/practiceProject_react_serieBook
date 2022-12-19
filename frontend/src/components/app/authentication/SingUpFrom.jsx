import React, {useEffect, useRef, useState} from 'react'

import InputText from "../../ui/form/InputText";
import InputPassword from "../../ui/form/InputPassword";
import Input from "../../ui/form/Input";
import Btn from "../../ui/form/Btn";


import classes from "./SingUpForm.module.css";
import {useDispatch, useSelector} from "react-redux";
import {isUsernameAvailable, singUpRequest} from "../../../store/authenticate-action";
import {isEmail, isNotEmpty, isPassword} from "../../../utils/Validation";



const SingUpFrom = (props) => {

    const dispatch = useDispatch();
    const singUpError = useSelector((state) => state.auth.singUpError);
    const usernameRef = useRef(null);
    const emailRef = useRef(null);
    const passwordRef = useRef(null);




    //  useEffect(() => {
    //     const identifier = setTimeout(async () => {
    //         let body = JSON.stringify({username: enteredUsername.value});
    //         // let response = await fetchData('/api/user/available/', 'Post', body);
    //         // console.log("Is User Valid: " + response.isUserAvailable);
    //         // setEnteredUsername(prevState => ({...prevState, valid: response.isUserAvailable}))
    //     }, 500);
    //
    //     return () => {
    //         clearTimeout(identifier);
    //     };
    // }, [enteredUsername.value]);


    const submitHandler = (e) => {
        e.preventDefault()
        usernameRef.current.onSubmit();
        emailRef.current.onSubmit();
        passwordRef.current.onSubmit();
        if(!usernameRef.current.isValid) return;
        if(!emailRef.current.isValid) return;
        if(!passwordRef.current.isValid) return;


        dispatch(singUpRequest({
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        }))
        // let error = validateForm();
        // const loggingValue = {
        //     username: enteredUsername.value,
        //     password: enteredPassword.value,
        //     email: enteredEmail.value
        // }
        // console.log("error is", error);
        // if(! error.available){
        //     console.log("Sing Up user: ", loggingValue);
        //     setErrorDisplayer({value: false, msg:""});
        //     singUpHandler(loggingValue);
        // } else {
        //     let errorMsg = error.msgs.length === 1 ? error.msgs[0] : "Please enter the correct information";
        //     setErrorDisplayer({value: true, msg: errorMsg});
        // }

        usernameRef.current.reset();
        emailRef.current.reset();
        passwordRef.current.reset();
    }

    // const validateForm = () => {
    //     let error = {available: false, msgs: []};
    //     if(enteredUsername.value === ""){
    //         console.log("Username is Empty");
    //         setEnteredUsername(prevState => ({...prevState, valid: false}));
    //         error.available = true;
    //         error.msgs.push("Username is Empty");
    //     } else {
    //         setEnteredUsername(prevState => ({...prevState, valid: true}));
    //     }
    //
    //     if(enteredEmail.value.indexOf('@') === NOT_FOUND){
    //         console.log("Email is Incorrect");
    //         setEnteredEmail(prevState => ({...prevState, valid: false}));
    //         console.log(error.msg)
    //         error.available = true;
    //         error.msgs.push("Incorrect Email");
    //     } else {
    //         setEnteredEmail(prevState => ({...prevState, valid: true}));
    //     }
    //
    //
    //     if(enteredPassword.value.length < 4){
    //         console.log("Password ist to Short");
    //         setEnteredPassword(prevState => ({...prevState, valid: false}));
    //         error.available = true;
    //         error.msgs.push("Password is to short");
    //     } else {
    //         setEnteredPassword(prevState => ({...prevState, valid: true}));
    //     }
    //
    //     return error
    // }

    const singUpHandler = async (singUp) => {
        // let body = JSON.stringify(singUp);
        // let response = await fetchData('/api/user/save', 'Post', body);
        //
        // console.log("SingUp Response ", response);
        // const loggingValue = {
        //     username: singUp.username,
        //     password: singUp.password
        // }
        // await loggingHandler(loggingValue);
    }

    return(
        <form className={classes.form} onSubmit={submitHandler}>
            <div>
                <Input type='text'
                       name='SingUpUsername'
                       placeholder='Username'
                       validateObj={new isNotEmpty().setErrorText("Username is Empty")}
                       backendValidator={isUsernameAvailable}
                       ref={usernameRef}/>
                {/*<InputText*/}
                {/*    error={! enteredUsername.valid}*/}
                {/*    placeholder='Username'*/}
                {/*    onChange={usernameHandler}/>*/}
            </div>
            <div className={classes.form_email}>
                <Input type='email'
                       name='SingUpEmail'
                       placeholder='Email'
                       validateObj={new isEmail().setErrorText("Email is not Valid")}
                       ref={emailRef}/>
                {/*<InputText*/}
                {/*    error={! enteredEmail.valid}*/}
                {/*    placeholder='Email'*/}
                {/*    onChange={emailHandler}/>*/}
            </div>
            <div className={classes.form_password}>
                <InputPassword name='SingUpPassword'
                               placeholder='Password'
                               validateObj={new isPassword().setErrorText("Passwort is not Valid")}
                               ref={passwordRef}/>
                {/*<InputPassword*/}
                {/*    error={! enteredPassword.valid}*/}
                {/*    onChange={passwordHandler}*/}
                {/*/>*/}
            </div>
            {
                singUpError.isFailed && <p className={classes.form_errorMsg}>{singUpError.errorText}</p>
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