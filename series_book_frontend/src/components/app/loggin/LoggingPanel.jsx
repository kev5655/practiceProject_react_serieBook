import React from 'react'
import Card from "../../ui/Card";

import classes from "./LoginPanel.module.css";
import LoggingForm from "./LoggingForm";

import {setJwtToken, setRefreshToken} from '../../utils/jwt';
import {fetchData, convertJsonTo_x_www_form_urlencoded} from '../../utils/api';


const LoggingPanel = (props) => {

    const loggingHandler = async (logging) => {
        const body = convertJsonTo_x_www_form_urlencoded(logging)

        let response = await fetchData('/api/login', 'Post', body, 'application/x-www-form-urlencoded;charset=UTF-8');

        setJwtToken(response.access_token)
        setRefreshToken(response.refresh_token)
        props.onLogging()
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