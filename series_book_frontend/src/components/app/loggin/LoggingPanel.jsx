import React from 'react'
import Card from "../../ui/Card";

import classes from "./LoginPanel.module.css";
import LoggingForm from "./LoggingForm";

import {setJwtToken, setRefreshToken} from '../../utils/jwt';


const LoggingPanel = (props) => {

    const loggingHandler = async (logging) => {
        let formBody = [];
        for (var property in logging) {
            var encodedKey = encodeURIComponent(property);
            var encodedValue = encodeURIComponent(logging[property]);
            formBody.push(encodedKey + "=" + encodedValue);
        }
        formBody = formBody.join("&");
        let response = await fetch(
             '/api/login', {
                method: 'Post',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
                },
                body: formBody
            });
        if(response.ok){
            response.json().then((res) => {
                setJwtToken(res.access_token)
                setRefreshToken(res.refresh_token)
                console.log(res.access_token , res.refresh_token)
                props.onLogging()
            })
        }else {
            console.log("Logging Failed")
        }

    }


    return (
        <Card className={classes.card}>
            <header className={classes.card_header}>
                <h1>Loggin</h1> {/* Global Styling in App.css */}
            </header>
            <LoggingForm
                onLogging={loggingHandler}
            />
        </Card>
    );
}

export default LoggingPanel;