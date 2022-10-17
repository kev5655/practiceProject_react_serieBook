import React, {useState} from 'react'

import Popup from 'reactjs-popup';

import Card from "../Card";
import Btn from "../form/Btn";

import classes from "./Info.module.css";


const Info = (props) => {
    const [openPopup, setOpenPopup] = useState(true);

    const onCancel = () => {
        setOpenPopup(false);
        props.onCancel();
    }

    const onAccept = () => {
        setOpenPopup(false);
        props.onAccept();
    }

    return (
        <Popup open={openPopup} closeOnDocumentClick onClose={onCancel}>
            <Card className={classes.card}>
                <div className={classes.label}>
                    <p>Do you want to delete the series</p>
                </div>
                <div className={classes.buttons}>
                    <Btn label="Cancel"
                         onClick={onCancel}
                         className={{
                             width: '30%'
                         }}/>
                    <Btn label="Yes"
                         onClick={onAccept}
                         className={{
                             width: '30%'
                         }}/>
                </div>
            </Card>
        </Popup>
    );
}

export default Info;