import Card from "../components/layout/Card";

import classes from './Settings.module.css'
import Input from "../components/ui/form/Input";
import Btn from "../components/ui/form/Btn";
import {isEmail, isNotEmpty, isPassword} from "../utils/Validation";
import {isUsernameAvailable} from "../store/authenticate-action";
import {useRef} from "react";
import InputPassword from "../components/ui/form/InputPassword";

const Settings = () => {

    const usernameRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();

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
                                   validateObj={new isNotEmpty().setErrorText("Username is Empty")}
                                   backendValidator={isUsernameAvailable}
                                   ref={usernameRef}/>
                            <Btn label="Update"/>
                        </div>
                    </div>
                    <div className={classes.setting_input}>
                        <p>Update Email</p>
                        <div className={classes.input}>
                            <Input type='email'
                                   name='updateEmail'
                                   validationObj={new isEmail()}
                                   ref={emailRef}/>
                            <Btn label="Update"/>
                        </div>
                    </div>
                    <div className={classes.setting_input}>
                        <p>Update Password</p>
                        <div className={classes.input}>
                            <InputPassword name='updatePassword'
                                           validateObj={new isPassword()}
                                           ref={passwordRef}/>
                            <Btn label="Update"/>
                        </div>
                    </div>
                    <div className={classes.space}></div>
                    <div className={classes.setting_action}>
                        <p>Logout</p>
                        <Btn label="Logout"/>
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