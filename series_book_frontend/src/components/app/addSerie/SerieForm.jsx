import React, {useEffect, useState} from 'react'

import classes from "./SerieForm.module.css";

import InputText from "../../ui/form/InputText";
import InputNumber from "../../ui/form/InputNumber";
import InputStars from "../../ui/form/InputStars";
import InputDate from "../../ui/form/InputDate";
import Btn from "../../ui/form/Btn";


const SerieForm = (props) => {

    const [isFormValid, setFormValid] = useState(false);
    const [enteredTitle, setEnteredTitle] = useState({value: '', isValid: false});
    const [enteredSession, setEnteredSession] = useState({value: '', isValid: false});
    const [enteredEpisode, setEnteredEpisode] = useState({value: '', isValid: false});
    const [enteredStartDate, setEnteredStartDate] = useState({value: '', isValid: false});
    const [enteredEndDate, setEnteredEndDate] = useState({value: '', isValid: false});
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

    //useEffect(() => {
    //    setFormValid(enteredTitle.isValid && enteredSession.isValid &&
    //        enteredEpisode.isValid && enteredStartDate && enteredEndDate);
    //}, [enteredTitle, enteredSession, enteredEpisode, enteredEndDate, enteredStartDate])

    const addSerieHandler = () => {
        if (enteredTitle.isValid && enteredSession.isValid &&
            enteredEpisode.isValid && enteredStartDate.isValid &&
            enteredEndDate.isValid) {
            console.log('onSubmit')
            props.onAddSerie({
                title: "Test",
                session: 3,
                episode: 33,
                startDate: new Date(),
                endDate: new Date(),
                stars: 5,
            })
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
                <InputStars className={{
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
                    submitValue='submit'
                    label='Add'
                    className={{
                    width: '90%',
                }}/>
                <Btn
                    label='Cancel'
                    className={{
                        width: '90%',
                    }}/>
            </div>
        </form>
    )
}

export default SerieForm;