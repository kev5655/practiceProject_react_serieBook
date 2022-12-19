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

        usernameRef.current.reset();
        emailRef.current.reset();
        passwordRef.current.reset();
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
            </div>
            <div className={classes.form_email}>
                <Input type='email'
                       name='SingUpEmail'
                       placeholder='Email'
                       validateObj={new isEmail()}
                       ref={emailRef}/>
            </div>
            <div className={classes.form_password}>
                <InputPassword name='SingUpPassword'
                               placeholder='Password'
                               validateObj={new isPassword()}
                               ref={passwordRef}/>
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