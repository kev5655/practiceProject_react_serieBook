import React, {useState} from 'react'
import ReactDOM from "react-dom";

import Popup from 'reactjs-popup';

import Card from "../Card";
import Btn from "../form/Btn";

import classes from "./Info.module.css";


const InfoPanel = (props) => {
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
                    <p>Wollen sie die Serie löschen</p>
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


const Info = (props) => {
    return (
        <React.Fragment>
            {
                ReactDOM.createPortal(<InfoPanel
                        onCancel={props.onCancel}
                        onAccept={props.onAccept}/>,
                    document.getElementById('infoCard_root')
                )
            }
        </React.Fragment>
    )
}

export default Info;