import React, { useState } from 'react'

import classes from "./SerieForm.module.css";

import InputText from "../../ui/form/InputText";
import InputNumber from "../../ui/form/InputNumber";
import InputStars from "../../ui/form/InputStars";
import InputDate from "../../ui/form/InputDate";
import Btn from "../../ui/form/Btn";


const SerieForm = (props) => {

    const [enteredTitle, setEnteredTitle] = useState({value: '', isValid: false});
    const [enteredSession, setEnteredSession] = useState({value: '', isValid: false});
    const [enteredEpisode, setEnteredEpisode] = useState({value: '', isValid: false});
    const [enteredStartDate, setEnteredStartDate] = useState({value: '', isValid: false});
    const [enteredEndDate, setEnteredEndDate] = useState({value: '', isValid: false});
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

    //useEffect(() => {
    //    setFormValid(enteredTitle.isValid && enteredSession.isValid &&
    //        enteredEpisode.isValid && enteredStartDate && enteredEndDate);
    //}, [enteredTitle, enteredSession, enteredEpisode, enteredEndDate, enteredStartDate])

    const addSerieHandler = (e) => {
        e.preventDefault()
        if (enteredTitle.isValid && enteredSession.isValid &&
            enteredEpisode.isValid && enteredStartDate.isValid &&
            enteredEndDate.isValid) {
            console.log('onSubmit')
            const newSerie = {
                title: enteredTitle.value,
                session: enteredSession.value,
                episode: enteredEpisode.value,
                startDate: enteredStartDate.value,
                endDate: enteredEndDate.value,
                stars: enteredStars.value,
            }
            props.onAddSerie(newSerie);
        }
    }


    return (
        <form className={classes.card_content} onSubmit={addSerieHandler}>
            <div className={classes.card_content_flex}>
                <div className={classes.card_content_input}>
                    <InputText
                        placeholder='Serie Name'
                        onChange={titleHandler}/>

                    <div className={classes.card_content_numbers}>
                        <InputNumber
                            className={{
                                margin: '4% 2% 4% 0'
                            }}
                            placeholder='Staffel'
                            onChange={sessionHandler}/>
                        <InputNumber
                            className={{
                                margin: '4% 0%'
                            }}
                            placeholder='Folge'
                            onChange={episodeHandler}/>
                    </div>
                </div>
                <InputStars
                    stars={starsHandler}
                    className={{
                    marginRight: '12%',
                    color: '#780000'
                }}/>
            </div>

            <div className={classes.card_content_dates}>
                <InputDate label='Start Watching' onChange={startDateHandler}/>
                <p className={classes.card_content_date_text}>to</p>
                <InputDate label='End Watching' onChange={endDateHandler}/>
            </div>

            <div className={classes.card_content_center_btn}>
                <Btn
                    label='Cancel'
                    onClick={props.onCancel}
                    className={{
                        width: '90%',
                    }}/>
                <Btn
                    submitValue='submit'
                    label='Add'
                    className={{
                    width: '90%',
                }}/>
            </div>
        </form>
    )
}

export default SerieForm;