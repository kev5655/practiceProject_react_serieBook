import React, {useRef} from 'react'

import Input, { InputRef } from "../../ui/form/Input.tsx";
import Btn from "../../ui/form/Btn";


// @ts-ignore
import classes from "./SignUpForm.module.css";
import {useDispatch, useSelector} from "react-redux";
import {IsEmail, IsNotEmpty, IsPassword, IsUserAvailable} from "../../../utils/Validation.ts";
import {useNavigate} from "react-router-dom";
import { signUp, SignUpData } from '../../../store/auth/auth-actions.ts';
import { AppDispatch } from '../../../store/store.ts';



interface SubmitHandlerEvent extends React.FormEvent<HTMLFormElement> {}

const SignUpFrom = (_: any) => {

    const dispatch = useDispatch<AppDispatch>();
    const signUpError = useSelector((state: any) => state.auth.signUpError);
    const isAuth = useSelector((state: any) => state.auth.isAuth);
    const navigate = useNavigate();

    const usernameRef = useRef<InputRef>({} as InputRef);
    const emailRef = useRef<InputRef>({} as InputRef);
    const passwordRef = useRef<InputRef>({} as InputRef);

    if (isAuth) {
        navigate('/series')
    }

    const submitHandler = async (e: SubmitHandlerEvent): Promise<void> => {
        e.preventDefault();

        const [usernameValid, emailValid, passwordValid] = await Promise.all([
            usernameRef.current.validateInput(),
            emailRef.current.validateInput(),
            passwordRef.current.validateInput()
        ]);
        const isValid = usernameValid && emailValid && passwordValid;
        if (!isValid) return;

        const userData: SignUpData = {
            username: usernameRef.current.value,
            email: emailRef.current.value,
            password: passwordRef.current.value
        };

        dispatch(signUp(userData));

        usernameRef.current.resetInput();
        emailRef.current.resetInput();
        passwordRef.current.resetInput();
    };

    return (
        <form className={classes.form} onSubmit={submitHandler}>
            <div>
                <Input type='text'
                       name='SignUpUsername'
                       placeholder='Username'
                       validators={[new IsNotEmpty("Username is Empty"), new IsUserAvailable()]}
                       ref={usernameRef}/>
            </div>
            <div className={classes.form_email}>
                <Input type='email'
                       name='SignUpEmail'
                       placeholder='Email'
                       validators={[new IsEmail()]}
                       ref={emailRef}/>
            </div>
            <div className={classes.form_password}>
                <Input type='password' name='SignUpPassword'
                       placeholder='Password'
                       isPassword={true}
                       validators={[new IsPassword()]}
                       ref={passwordRef}/>
            </div>
            {
                signUpError.isFailed && <p className={classes.form_errorMsg}>{signUpError.errorText}</p>
            }
            <div className={classes.form_button}>
                <Btn
                    label="Sign Up"
                    submitValue='submit'
                    className={{
                        width: '50%',
                    }}
                />
            </div>
        </form>
    )
}

export default SignUpFrom;