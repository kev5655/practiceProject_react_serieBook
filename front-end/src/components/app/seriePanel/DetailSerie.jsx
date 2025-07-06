import React, {useState, useCallback} from 'react'

import Popup from "reactjs-popup";


import Card from "../../layout/Card";

import classes from './DetailSerie.module.css'
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";



const DetailSerie = (props) => {
    const {onClickOutside} = props;
    const {title, session, episode, stars, startDate, endDate, createdDate, lastModifiedDate} = props.serie;
    const [openPopUp, setOpenPopUp] = useState(true);

    const createArray = (fillUp, length) => {
        let array = new Array(length).fill(1)
        array = array.fill(0, fillUp)
        return array;
    }

    const onClose = useCallback((event) => {
        // Stop propagation to prevent the click from reaching Serie components underneath
        if (event) {
            event.preventDefault();
            event.stopPropagation();
        }
        setOpenPopUp(false);
        onClickOutside();
    }, [onClickOutside]);

    const isUnknown = (value) => {
        return value !== null && value !== 0 && value !== undefined && value !== '';
    }

    // On component mount, add global touch event handlers
    React.useEffect(() => {
        // Function to block touch events globally while the popup is open
        const blockTouchEvents = (e) => {
            // Only block touch events if they're not on the popup itself
            if (!e.target.closest('#detailSerie')) {
                e.preventDefault();
                e.stopPropagation();
                onClose(e);
            }
        };
        
        // Add touch event listeners
        document.addEventListener('touchstart', blockTouchEvents, { passive: false });
        document.addEventListener('touchmove', blockTouchEvents, { passive: false });
        
        // Clean up
        return () => {
            document.removeEventListener('touchstart', blockTouchEvents);
            document.removeEventListener('touchmove', blockTouchEvents);
        };
    }, [onClose]);

    return (
        <Popup 
            open={openPopUp} 
            closeOnDocumentClick 
            onClose={onClose}
            // Prevent click events from reaching elements below the overlay
            overlayStyle={{ zIndex: 1000 }}
            // Add an overlay className to add our own event handlers
            overlayClassName={classes.popupOverlay}
        >
            <Card className={classes.card}
                  id='detailSerie'
            >
                <header className={classes.header}>
                    <p className={classes.header_title}>{title}</p>
                </header>
                <section className={classes.gird}>
                    <div className={classes.grid_container_session}>
                        <p>Session</p>
                        <p>{session} </p>
                    </div>
                    <div className={classes.gird_container_episode}>
                        <p>Episode</p>
                        {isUnknown(episode) ?
                            <p>{episode}</p> :
                            <p>unknown</p>}
                    </div>

                    <div className={classes.grid_stars}>
                        {createArray(stars, 5).map((value, i) => {
                            if (value === 1) {
                                return (<StarRoundedIcon className={classes.serie_secondRow_star} key={i}/>)
                            } else {
                                return (<StarOutlineRoundedIcon className={classes.serie_secondRow_star} key={i}/>)
                            }
                        })}
                    </div>

                    <div className={classes.dateGrid}>
                        <p className={`${classes.dateGrid_item_desc_startDate} ${classes.dateGrid_desc_date}`}>
                            Start Date</p>
                        <p className={` ${classes.dateGrid_item_desc_endDate} ${classes.dateGrid_desc_date} `}>End
                            Date</p>

                        <div className={` ${classes.dateGrid_item_value_startDate} ${classes.skewCard}`}>
                            {isUnknown(startDate) ?
                                <p>{new Date(startDate).toLocaleDateString()}</p> :
                                <p>unknown</p>}
                        </div>
                        <div className={` ${classes.dateGrid_item_value_endDate} ${classes.skewCard}`}>
                            {isUnknown(endDate) ?
                                <p>{new Date(endDate).toLocaleDateString()}</p> :
                                <p>unknown</p>}
                        </div>
                    </div>
                    <div className={classes.grid_container_createdDate}>
                        <div>
                            <p>Created Date: </p>
                            <p>{new Date(createdDate).toLocaleString()}</p>
                        </div>
                        <div>
                            <p>Last Modification: </p>
                            <p>{new Date(lastModifiedDate).toLocaleString()}</p>
                        </div>
                    </div>
                </section>
            </Card>
        </Popup>
    )
}

export default DetailSerie;
