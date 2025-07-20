import React, {useRef, useState} from 'react'


import InputStars from "../../ui/form/InputStars";
import Btn from "../../ui/form/Btn";
import InputDatepicker from "../../ui/form/InputDatepicker";
import Input from "../../ui/form/Input.tsx";

import classes from "./ManageSerieForm.module.css";
import {IsNotEmpty} from "../../../utils/Validation.ts";
import {useDispatch, useSelector} from "react-redux";
import {seriesAction} from "../../../store/series-slice";
import {useNavigate} from "react-router-dom";
import {addSerie, editSerie} from "../../../store/series-action";


// https://mui.com/material-ui/react-autocomplete/#autocomplete-autofill for LabelPicker
const EditSerieForm = () => {

    const activeSerie = useSelector(state => state.series.selectSerie);
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [enteredStartDate, setEnteredStartDate] = useState(activeSerie.startDate);
    const [enteredEndDate, setEnteredEndDate] = useState(activeSerie.endDate);
    const [enteredStars, setEnteredStars] = useState(activeSerie.stars);

    const serieNameRef = useRef(null);
    const sessionRef = useRef(null);
    const episodeRef = useRef(null);

    const startDateHandler = (value) => {
        setEnteredStartDate(value);
    }
    const endDateHandler = (value) => {
        setEnteredEndDate(value);
    }
    const starsHandler = (value) => {
        setEnteredStars(value);
    }

    const submitHandler = (e) => {
        e.preventDefault()
        let serieNameError = !serieNameRef.current.onSubmit();
        let sessionError = !sessionRef.current.onSubmit();
        let episodeError = !episodeRef.current.onSubmit();

        if(serieNameError || sessionError || episodeError) return;


        if(activeSerie.id === ''){
            dispatch(addSerie({
                title: serieNameRef.current.value,
                session: sessionRef.current.value,
                episode: episodeRef.current.value,
                stars: enteredStars,
                startDate: enteredStartDate,
                endDate: enteredEndDate,
                createdDate: Date.now() - 3600000,
                lastModifiedDate: Date.now() - 3600000,
            }));
        } else {
            dispatch(editSerie({
                id: activeSerie.id,
                title: serieNameRef.current.value,
                session: sessionRef.current.value,
                episode: episodeRef.current.value,
                stars: enteredStars,
                startDate: enteredStartDate,
                endDate: enteredEndDate,
                createdDate: activeSerie.createdDate,
                lastModifiedDate: Date.now() - 3600000,
            }));
            dispatch(seriesAction.disselect());
        }


        serieNameRef.current.reset();
        sessionRef.current.reset();
        episodeRef.current.reset();
        navigate('/series');
    }

    const onCancel =  () => {
        dispatch(seriesAction.disselect());
        navigate('/series');
    };


    return (
        <form className={classes.grid} onSubmit={submitHandler}>
            <div className={`${classes.grid_title_container} ${classes.item}`}>
                <Input type='text'
                       initValue={activeSerie.title}
                       name='SerieName'
                       placeholder='Serie Name'
                       validator={new IsNotEmpty("Serie need a name")}
                       ref={serieNameRef}/>
            </div>

            <div className={`${classes.grid_episode_season_container} ${classes.item}`}>
                <Input type='number'
                       initValue={activeSerie.session}
                       name='Session'
                       placeholder='Session'
                       validator={new IsNotEmpty("Add a number")}
                       ref={sessionRef}/>
                <Input type='number'
                       initValue={activeSerie.episode}
                       name='Episode'
                       placeholder='Episode'
                       ref={episodeRef}/>
            </div>

            <div className={`${classes.grid_stars_container} ${classes.item}`}>
                <InputStars
                    value={enteredStars}
                    className={{
                        color: '#780000',
                        fontFamily: "\"JetBrains Mono\", sans-serif"
                    }}
                    stars={starsHandler}/>
            </div>

            <div className={`${classes.grid_date_container} ${classes.item} ${classes.space}`}>
                <InputDatepicker
                    label='Start Date'
                    value={enteredStartDate}
                    onChange={startDateHandler}
                />

                <p className={classes.grid_date_text}>to</p>

                <InputDatepicker
                    label='End Date'
                    value={enteredEndDate}
                    onChange={endDateHandler}
                />
            </div>


            <div className={`${classes.grid_cancelBtn_container} ${classes.item} ${classes.space}`}>
                <Btn
                    label='Cancel' // Cancel
                    className={{
                        width: '100%',
                    }}
                    onClick={onCancel}/>
            </div>

            <div className={`${classes.grid_submitBtn_container} ${classes.item} ${classes.space}`}>
                <Btn
                    label={activeSerie.id !== '' ? 'Edit' : 'Add'}  // Add
                    submitValue='submit'
                    className={{
                        width: '100%',
                    }}/>
            </div>

        </form>
    )
}

export default EditSerieForm;
