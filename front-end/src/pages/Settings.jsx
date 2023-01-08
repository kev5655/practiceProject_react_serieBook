import Card from "../components/layout/Card";

import classes from './Settings.module.css'
import Input from "../components/ui/form/Input";
import Btn from "../components/ui/form/Btn";
import {isEmail, isNotEmpty, isPassword} from "../utils/Validation";
import {isUsernameAvailable, logout} from "../store/authenticate-action";
import {useRef, useState} from "react";
import InputPassword from "../components/ui/form/InputPassword";
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";

const Settings = () => {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

    const [isShowUsernameBtn, setShowUsernameBtn] = useState(false);
    const [isShowEmailBtn, setShowEmailBtn] = useState(false);
    const [isShowPasswordBtn, setShowPasswordBtn] = useState(false);


    const usernameFocusHandler = () => {
        setShowUsernameBtn(true);
        emailRef.current.reset();
        passwordRef.current.reset();
        setShowEmailBtn(false);
        setShowPasswordBtn(false);
    }


    const emailFocusHandler = () => {
        setShowEmailBtn(true);
        usernameRef.current.reset();
        passwordRef.current.reset();
        setShowUsernameBtn(false);
        setShowPasswordBtn(false);
    }


    const passwordFocusHandler = () => {
        setShowPasswordBtn(true);
        usernameRef.current.reset();
        emailRef.current.reset();
        setShowEmailBtn(false);
        setShowUsernameBtn(false);
        setShowEmailBtn(false);
    }


    const submitUsername = () => {
        if(!usernameRef.current.onSubmit()) return;
        let value = usernameRef.current.value;
        usernameRef.current.reset();
    }


    const submitEmail = () => {
        if(!emailRef.current.onSubmit()) return;
        let value = emailRef.current.value;
        emailRef.current.reset();
    }

    const submitPassword = () => {
        if(!passwordRef.current.onSubmit()) return;
        let value = passwordRef.current.value;
        passwordRef.current.reset();
    }


    const logoutHandler = () => {
        dispatch(logout());
    }

    return (
        <Card className={classes.card}>
            <header className={classes.header}>
                <h1>Settings</h1>
            </header>
            <div className={classes.article}>
                <section className={classes.section}>
                    <h2 className={classes.section_title}>Profile</h2>
                    <div className={classes.setting_input}>
                        <p>Update Username</p>
                        <div className={classes.input}>
                            <Input type='text'
                                   name='UpdateUsername'
                                   validator={new isNotEmpty().setErrorText("Username is Empty")}
                                   // validateOnSubmitting={new isNotEmpty().setErrorText("Username is Empty")}
                                   backendValidator={isUsernameAvailable}
                                   onFocus={usernameFocusHandler}
                                   ref={usernameRef}/>
                            { isShowUsernameBtn && <Btn label="Update" onClick={submitUsername}/>}
                        </div>
                    </div>
                    <div className={classes.setting_input}>
                        <p>Update Email</p>
                        <div className={classes.input}>
                            <Input type='email'
                                   name='updateEmail'
                                   validator={new isEmail()}
                                   onFocus={emailFocusHandler}
                                   ref={emailRef}/>
                            { isShowEmailBtn && <Btn label="Update" onClick={submitEmail}/>}
                        </div>
                    </div>
                    <div className={classes.setting_input}>
                        <p>Update Password</p>
                        <div className={classes.input}>
                            <InputPassword name='updatePassword'
                                           validator={new isPassword()}
                                           onFocus={passwordFocusHandler}
                                           ref={passwordRef}/>
                            { isShowPasswordBtn && <Btn label="Update" onClick={submitPassword}/>}
                        </div>
                    </div>
                    <div className={classes.space}></div>
                    <div className={classes.setting_action}>
                        <p>Logout</p>
                        <Btn label="Logout" onClick={logoutHandler}/>
                    </div>
                    <div className={classes.setting_action}>
                        <p>Delete Account</p>
                        <Btn label="Delete Account"/>
                    </div>
                </section>

                <section className={classes.section}>
                    <h2 className={classes.section_title}>Design</h2>
                    <div className={classes.setting_action}>
                        <p>Theme</p>
                        <Btn label="Toggle Dark-mode"/>
                    </div>
                </section>

                <section className={classes.section}>
                    <h2 className={classes.section_title}>Series</h2>
                    <div className={classes.setting_input}>
                        <p>Upload Netflix Data</p>
                        <div className={classes.input}>
                            <input type="file"
                                   id="netflixCSV" name="netflixCSV"
                                   accept="text/csv"/>
                            <Btn label="Upload"/>
                        </div>
                    </div>
                </section>
            </div>
        </Card>
    )
}

export default Settings;