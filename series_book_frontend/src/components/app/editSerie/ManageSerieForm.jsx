import React, { useState } from 'react'

import classes from "./SerieForm.module.css";

import InputText from "../../ui/form/InputText";
import InputNumber from "../../ui/form/InputNumber";
import InputStars from "../../ui/form/InputStars";
import InputDate from "../../ui/form/InputDate";
import Btn from "../../ui/form/Btn";


const ManageSerieForm = (props) => {

    let defaultIsValid = false;
    if(props.isEdit){
        defaultIsValid = true;
    }

    const [enteredTitle, setEnteredTitle] = useState({value: '', isValid: defaultIsValid});
    const [enteredSession, setEnteredSession] = useState({value: '', isValid: defaultIsValid});
    const [enteredEpisode, setEnteredEpisode] = useState({value: '', isValid: defaultIsValid});
    const [enteredStartDate, setEnteredStartDate] = useState({value: '', isValid: defaultIsValid});
    const [enteredEndDate, setEnteredEndDate] = useState({value: '', isValid: defaultIsValid});
    const [enteredStars, setEnteredStars] = useState({value: [0,0,0,0,0]})
    //TODO Validate Enterte E-Mail
    const titleHandler = (value) => {
        setEnteredTitle({value: value, isValid: true});
    }

    const sessionHandler = (value) => {
        setEnteredSession({value: value, isValid: true});
    }

    const episodeHandler = (value) => {
        setEnteredEpisode({value: value, isValid: true})
    }

    const startDateHandler = (value) => {
        setEnteredStartDate({value: value, isValid: true})
    }

    const endDateHandler = (value) => {
        setEnteredEndDate({value: value, isValid: true})
    }

    const starsHandler = (value) => {
        setEnteredStars({value: value})
    }

    const submitHandler = (e) => {
        e.preventDefault()
        if (enteredTitle.isValid && enteredSession.isValid &&
            enteredEpisode.isValid && enteredStartDate.isValid &&
            enteredEndDate.isValid) {
            console.log('onSubmit')
            const manageSerie = {
                title: enteredTitle.value,
                session: enteredSession.value,
                episode: enteredEpisode.value,
                startDate: enteredStartDate.value,
                endDate: enteredEndDate.value,
                stars: enteredStars.value,
            }
            props.onManagedSerie(manageSerie);
        }
    }

    console.log(props)


    return (
        <form className={classes.card_content} onSubmit={submitHandler}>
            <div className={classes.card_content_flex}>
                <div className={classes.card_content_input}>
                    <InputText
                        placeholder='Serie Name'
                        value={props.titleValue}
                        onChange={titleHandler}/>

                    <div className={classes.card_content_numbers}>
                        <InputNumber
                            placeholder='Staffel'
                            value={props.sessionValue}
                            className={{
                                margin: '4% 2% 4% 0'
                            }}
                            onChange={sessionHandler}/>
                        <InputNumber
                            placeholder='Folge'
                            value={props.episodeValue}
                            className={{
                                margin: '4% 0%'
                            }}
                            onChange={episodeHandler}/>
                    </div>
                </div>
                <InputStars
                    value={props.starsValue}
                    className={{
                        marginRight: '12%',
                        color: '#780000'
                    }}
                    stars={starsHandler}/>
            </div>

            <div className={classes.card_content_dates}>
                <InputDate label='Start Watching'
                           value={props.startDateValue}
                           onChange={startDateHandler}/>
                <p className={classes.card_content_date_text}>to</p>
                <InputDate
                    value={props.endDateValue}
                    label='End Watching'
                    onChange={endDateHandler}/>
            </div>

            <div className={classes.card_content_center_btn}>
                <Btn
                    label={props.cancelBtnLabel} // Cancel
                    className={{
                        width: '90%',
                    }}
                    onClick={props.onCancel}/>
                <Btn
                    label={props.submitBtnLabel}  // Add
                    submitValue='submit'
                    className={{
                    width: '90%',
                }}/>
            </div>
        </form>
    )
}

export default ManageSerieForm;