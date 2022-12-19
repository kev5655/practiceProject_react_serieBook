import React, {forwardRef, useImperativeHandle, useRef, useState} from 'react'


import InputText from "../../ui/form/InputText";
import InputStars from "../../ui/form/InputStars";
import Btn from "../../ui/form/Btn";
import InputDatepicker from "../../ui/form/InputDatepicker";
import InputNumber from "../../ui/form/InputNumber";
import {useNavigate} from "react-router-dom";
import Input from "../../ui/form/Input";
// import {fetchData} from "../../../utils/api"

import classes from "./ManageSerieForm.module.css";
import {isNotEmpty} from "../../../utils/Validation";


// https://mui.com/material-ui/react-autocomplete/#autocomplete-autofill for LabelPicker
const EditSerieForm = forwardRef ((props, ref) => {

    let serie = props.editingSerie

    const [enteredTitle, setEnteredTitle] = useState({value: serie.title, isValid: serie.isEdit});
    const [enteredSession, setEnteredSession] = useState({value: serie.session, isValid: serie.isEdit});
    const [enteredEpisode, setEnteredEpisode] = useState({value: serie.episode, isValid: serie.isEdit});
    const [enteredStartDate, setEnteredStartDate] = useState({value: serie.startDate, isValid: serie.isEdit});
    const [enteredEndDate, setEnteredEndDate] = useState({value: serie.endDate, isValid: serie.isEdit});
    const [enteredStars, setEnteredStars] = useState({value: serie.stars})

    const [errorTitle, isErrorTitle] = useState(false);
    const [errorSession, isErrorSession] = useState(false);

    const serieNameRef = useRef(null);
    const sessionRef = useRef(null);
    const episodeRef = useRef(null);

    const titleHandler = (value) => {
        isErrorTitle(false);
        setEnteredTitle({value: value, isValid: value !== ""});
    }
    const sessionHandler = (value) => {
        isErrorSession(false);
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
        if (enteredTitle.isValid && enteredSession.isValid) {

            let manageSerie = getSerieDate();

            if (props.isEdit === true) {
                await updateSerieIntoDB(manageSerie)
            } else {
                delete manageSerie.id
                manageSerie.id = await saveSerieIntoDB(manageSerie);
            }
            manageSerie.isEdit = props.isEdit;
            props.onManagedSerie(manageSerie);
        }  else {
            isErrorTitle(!enteredTitle.isValid)
            isErrorSession(!enteredSession.isValid);
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
            lastModifiedDate: new Date(Date.now()),
            stars: enteredStars.value,
        };
    }


    useImperativeHandle(ref, () => ({
        // async deleteSerie(){
        //     await fetchData("/api/serie/delete",
        //         "Delete",
        //         JSON.stringify(getSerieDate()),
        //         'application/json')
        // }
    }));

    let updateSerieIntoDB = async (updateSerie) => {
        // await fetchData("/api/serie/update",
        //     "Put",
        //     JSON.stringify(updateSerie),
        //     'application/json')
    }

    let saveSerieIntoDB = async (addSerie) => {
        // let response = await fetchData("/api/serie/add",
        //     "Post",
        //     JSON.stringify(addSerie),
        //     'application/json')
        // return response.id
    }

    return (
        <form className={classes.grid} onSubmit={submitHandler}>
            <div className={`${classes.grid_title_container} ${classes.item}`}>
                <Input tpye='text'
                       name='SerieName'
                       placeholder='Serie Name'
                       validateObj={new isNotEmpty().setErrorText("Series need a name")}
                       ref={serieNameRef}/>
                {/*<InputText*/}
                {/*    placeholder='Serie Name'*/}
                {/*    value={enteredTitle.value}*/}
                {/*    error={errorTitle}*/}
                {/*    onChange={titleHandler}/>*/}
            </div>

            <div className={`${classes.grid_episode_season_container} ${classes.item}`}>
                <Input tpye='number'
                       name='Session'
                       placeholder='Session'
                       validateObj={new isNotEmpty().setErrorText("Series need a session number")}
                       ref={sessionRef}/>
                <Input tpye='number'
                       name='Episode'
                       placeholder='Episode'
                       ref={episodeRef}/>
                {/*<InputNumber*/}
                {/*    placeholder='Staffel'*/}
                {/*    value={enteredSession.value}*/}
                {/*    error={errorSession}*/}
                {/*    onChange={sessionHandler}/>*/}
                {/*<InputNumber*/}
                {/*    placeholder='Folge'*/}
                {/*    value={enteredEpisode.value}*/}
                {/*    onChange={episodeHandler}/>*/}
            </div>

            <div className={`${classes.grid_stars_container} ${classes.item}`}>
                <InputStars
                    value={enteredStars.value}
                    className={{
                        color: '#780000',
                        fontFamily: "\"JetBrains Mono\", sans-serif"
                    }}
                    stars={starsHandler}/>
            </div>

            <div className={`${classes.grid_date_container} ${classes.item} ${classes.space}`}>
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


            <div className={`${classes.grid_cancelBtn_container} ${classes.item} ${classes.space}`}>
                <Btn
                    label={props.cancelBtnLabel} // Cancel
                    className={{
                        width: '100%',
                    }}
                    onClick={props.onCancel}/>
            </div>

            <div className={`${classes.grid_submitBtn_container} ${classes.item} ${classes.space}`}>
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

export default EditSerieForm;
