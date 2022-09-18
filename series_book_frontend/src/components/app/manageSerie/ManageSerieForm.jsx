import React, {useState} from 'react'


import InputText from "../../ui/form/InputText";
import InputNumber from "../../ui/form/InputNumber";
import InputStars from "../../ui/form/InputStars";
import Btn from "../../ui/form/Btn";
import InputDatepicker from "../../ui/form/InputDatepicker";

import {fetchData} from "../../utils/api"

import classes from "./ManageSerieForm.module.css";

// https://mui.com/material-ui/react-autocomplete/#autocomplete-autofill for LabelPicker
const ManageSerieForm = (props) => {

    let defaultIsValid = false;
    if (props.isEdit) {
        defaultIsValid = true;
    }

    const [enteredTitle, setEnteredTitle] = useState({value: props.titleValue, isValid: defaultIsValid});
    const [enteredSession, setEnteredSession] = useState({value: props.sessionValue, isValid: defaultIsValid});
    const [enteredEpisode, setEnteredEpisode] = useState({value: props.episodeValue, isValid: defaultIsValid});
    const [enteredStartDate, setEnteredStartDate] = useState({value: props.startDateValue, isValid: defaultIsValid});
    const [enteredEndDate, setEnteredEndDate] = useState({value: props.endDateValue, isValid: defaultIsValid});
    const [enteredStars, setEnteredStars] = useState({value: props.starsValue})
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

            let id;
            if (props.id === undefined) {
                id = Math.round(1 * (2147483647 * 2) - 2147483648);
            } else {
                id = props.id
            }

            const manageSerie = {
                userId: 1,
                title: enteredTitle.value,
                session: enteredSession.value,
                episode: enteredEpisode.value,
                startDate: enteredStartDate.value,
                createdDate: props.createdDateValue ?? Date.now(),
                endDate: enteredEndDate.value,
                stars: enteredStars.value,
            }

            if(props.isEdit === "true"){
                //updateDB(manageSerie);
            }else {
                saveSerieIntoDB(manageSerie);
            }
            manageSerie.isEdit= props.isEdit;
            props.onManagedSerie(manageSerie);
        }
    }



    let updateDB = async (updateSerie) => {
        await fetch(`/api/series/${updateSerie.id}/update/`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(updateSerie)
        })
    }

    let saveSerieIntoDB = async (addSerie) => {
        await fetchData("/api/serie/add",
            "Post",
            JSON.stringify(addSerie),
            'application/json')

        //await fetch("/api/series/add", {
        //    method: 'POST',
        //    headers: {
        //        'Content-Type': 'application/json'
        //    },
        //    body: JSON.stringify(addSerie)
        //})
    }


    return (
        <form className={classes.grid} onSubmit={submitHandler}>
            <div className={`${classes.grid_title_item} ${classes.item}`}>
                <InputText
                    placeholder='Serie Name'
                    value={props.titleValue}
                    onChange={titleHandler}/>
            </div>

            <div className={`${classes.grid_episode_season_item} ${classes.item}`}>
                <InputNumber
                    placeholder='Staffel'
                    value={props.sessionValue}
                    onChange={sessionHandler}/>
                <InputNumber
                    placeholder='Folge'
                    value={props.episodeValue}
                    onChange={episodeHandler}/>
            </div>

            <div className={`${classes.grid_stars_item} ${classes.item}`}>
                <InputStars
                    value={props.starsValue}
                    className={{
                        color: '#780000',
                        fontFamily: "\"JetBrains Mono\", sans-serif"
                    }}
                    stars={starsHandler}/>
            </div>

            <div className={`${classes.grid_date_item} ${classes.item} ${classes.space}`}>
                <InputDatepicker
                    label='Start Date'
                    value={props.startDateValue}
                    onChange={startDateHandler}
                />

                <title className={classes.grid_date_text}>to</title>

                <InputDatepicker
                    label='End Date'
                    value={props.endDateValue}
                    onChange={endDateHandler}
                />
            </div>


            <div className={`${classes.grid_cancelBtn_item} ${classes.item} ${classes.space}`}>
                <Btn
                    label={props.cancelBtnLabel} // Cancel
                    className={{
                        width: '100%',
                    }}
                    onClick={props.onCancel}/>
            </div>

            <div className={`${classes.grid_submitBtn_item} ${classes.item} ${classes.space}`}>
                <Btn
                    label={props.submitBtnLabel}  // Add
                    submitValue='submit'
                    className={{
                        width: '100%',
                    }}/>
            </div>

        </form>
    )
}

export default ManageSerieForm;
