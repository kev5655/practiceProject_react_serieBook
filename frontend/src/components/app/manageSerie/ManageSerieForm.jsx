import React, {forwardRef, useImperativeHandle, useState} from 'react'


import InputText from "../../ui/form/InputText";
import InputStars from "../../ui/form/InputStars";
import Btn from "../../ui/form/Btn";
import InputDatepicker from "../../ui/form/InputDatepicker";
import InputNumber from "../../ui/form/InputNumber";
import {fetchData} from "../../utils/api"

import classes from "./ManageSerieForm.module.css";


// https://mui.com/material-ui/react-autocomplete/#autocomplete-autofill for LabelPicker
const ManageSerieForm = forwardRef ((props, ref) => {

    let defaultIsValid = false;
    if (props.isEdit === "true") {
        defaultIsValid = true;
    }

    let serie = {}
    if (props.editingSerie === undefined){
        serie.id = ''
        serie.title = ''
        serie.session = ''
        serie.episode = ''
        serie.startDate = ''
        serie.endDate = ''
        serie.stars = ''
        serie.createdDate = null
    } else {
        serie = props.editingSerie
    }

    const [enteredTitle, setEnteredTitle] = useState({value: serie.title, isValid: defaultIsValid});
    const [enteredSession, setEnteredSession] = useState({value: serie.session, isValid: defaultIsValid});
    const [enteredEpisode, setEnteredEpisode] = useState({value: serie.episode, isValid: defaultIsValid});
    const [enteredStartDate, setEnteredStartDate] = useState({value: serie.startDate, isValid: defaultIsValid});
    const [enteredEndDate, setEnteredEndDate] = useState({value: serie.endDate, isValid: defaultIsValid});
    const [enteredStars, setEnteredStars] = useState({value: serie.stars})

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

    const submitHandler = async (e) => {
        e.preventDefault()
        if (enteredTitle.isValid && enteredSession.isValid &&
            enteredEpisode.isValid && enteredStartDate.isValid &&
            enteredEndDate.isValid) {

            let manageSerie = getSerieDate();

            if (props.isEdit === true) {
                await updateSerieIntoDB(manageSerie)
            } else {
                delete manageSerie.id
                manageSerie.id = await saveSerieIntoDB(manageSerie);
            }
            manageSerie.isEdit = props.isEdit;
            props.onManagedSerie(manageSerie);
        }
    }

    const getSerieDate = () => {
        return {
            id: serie.id,
            title: enteredTitle.value,
            session: enteredSession.value,
            episode: enteredEpisode.value,
            startDate: enteredStartDate.value,
            endDate: enteredEndDate.value,
            createdDate: serie.createdDate ?? new Date(Date.now()),
            stars: enteredStars.value,
        };
    }


    useImperativeHandle(ref, () => ({
        async deleteSerie(){
            await fetchData("/api/serie/delete",
                "Delete",
                JSON.stringify(getSerieDate()),
                'application/json')
        }
    }));

    let updateSerieIntoDB = async (updateSerie) => {
        await fetchData("/api/serie/update",
            "Put",
            JSON.stringify(updateSerie),
            'application/json')
    }

    let saveSerieIntoDB = async (addSerie) => {
        let response = await fetchData("/api/serie/add",
            "Post",
            JSON.stringify(addSerie),
            'application/json')
        return response.id
    }

    return (
        <form className={classes.grid} onSubmit={submitHandler}>
            <div className={`${classes.grid_title_item} ${classes.item}`}>
                <InputText
                    placeholder='Serie Name'
                    value={enteredTitle.value}
                    onChange={titleHandler}/>
            </div>

            <div className={`${classes.grid_episode_season_item} ${classes.item}`}>
                <InputNumber
                    placeholder='Staffel'
                    value={enteredSession.value}
                    onChange={sessionHandler}/>
                <InputNumber
                    placeholder='Folge'
                    value={enteredEpisode.value}
                    onChange={episodeHandler}/>
            </div>

            <div className={`${classes.grid_stars_item} ${classes.item}`}>
                <InputStars
                    value={enteredStars.value}
                    className={{
                        color: '#780000',
                        fontFamily: "\"JetBrains Mono\", sans-serif"
                    }}
                    stars={starsHandler}/>
            </div>

            <div className={`${classes.grid_date_item} ${classes.item} ${classes.space}`}>
                <InputDatepicker
                    label='Start Date'
                    value={enteredStartDate.value}
                    onChange={startDateHandler}
                />

                <title className={classes.grid_date_text}>to</title>

                <InputDatepicker
                    label='End Date'
                    value={enteredEndDate.value}
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
})

export default ManageSerieForm;
