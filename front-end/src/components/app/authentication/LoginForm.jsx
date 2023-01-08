import React, {useRef} from 'react'
import InputPassword from "../../ui/form/InputPassword";

import classes from "./LoggingForm.module.css"
import Btn from "../../ui/form/Btn";
import {useDispatch, useSelector} from "react-redux";
import {authRequest} from "../../../store/authenticate-action";
import {useNavigate} from "react-router-dom";
import Input from "../../ui/form/Input";
import {isNotEmpty} from "../../../utils/Validation";

const LoginForm = () => {
    const dispatch = useDispatch();
    const loginError = useSelector((state) => state.auth.loginError);
    const isAuth = useSelector(state => state.auth.isAuth);
    const navigate = useNavigate();
    const usernameRef = useRef(null);
    const passwordRef = useRef(null);

    if (isAuth) {
        navigate('/series')
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if(!usernameRef.current.onSubmit()) return;
        if(!passwordRef.current.onSubmit()) return;

        dispatch(authRequest({
            username: usernameRef.current.value,
            password: passwordRef.current.value
        }))
        usernameRef.current.reset();
        passwordRef.current.reset()
    }


    return (
        <>
            <form className={classes.form} onSubmit={submitHandler}>
                <div>
                    <Input
                        type='text'
                        name='Username'
                        placeholder='Username'
                        validateOnRuntime={new isNotEmpty().setErrorText("Username is Empty")}
                        ref={usernameRef}/>
                </div>
                <div className={classes.form_password}>
                    <InputPassword
                        name='LoginPassword'
                        placeholder='Password'
                        validateOnRuntime={new isNotEmpty().setErrorText("Password is Empty")}
                        ref={passwordRef}
                    />
                </div>
                {
                    loginError.isFailed && <p className={classes.form_errorMsg}>{loginError.errorText}</p>
                }
                <div className={classes.defaultsLogin}>
                    <p>Default Username: test</p>
                    <p>Default Password: 123abc</p>
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

        </>
    );
}

export default LoginForm;