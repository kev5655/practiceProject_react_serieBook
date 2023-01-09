import React, {useEffect, useState} from 'react'

import DeleteIcon from '@mui/icons-material/Delete';

import EditSerieForm from "../components/app/manageSerie/EditSerieForm";
import Card from "../components/layout/Card";
import InfoPopup from "../components/ui/popup/InfoPopup";
import IconBtn from "../components/ui/form/IconBtn";

import classes from './ManageSeriePanel.module.css'
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {erasing} from "../store/series-action";



const ManageSeriePanel = () => {

    const [activeDeletion, setActiveDeletion] = useState(false);
    const disptach = useDispatch();
    const editSerie = useSelector(state => state.series.selectSerie)
    const navigate = useNavigate();

    useEffect(() => {
        if (editSerie.id === '') {
            navigate('/series/add');
        }
    }, [editSerie.id, navigate])

    const onActivateDeletion = () => {
        setActiveDeletion(true);
    }

    const onAcceptDeletionClickHandler = () => {
        setActiveDeletion(false);
        disptach(erasing(editSerie));
        navigate('/series');
    }

    const onCancelDeletionClickHandler = () => {
        setActiveDeletion(false);
    }


    return (
        <Card className={classes.card}>
            <header className={classes.card_header}>
                <h1>{editSerie.id !== '' ? "Edit Serie" : "Add Serie"}</h1> {/* Global Styling in App.css */}
                {editSerie.id !== '' && <IconBtn icon={DeleteIcon}
                                                 onClick={onActivateDeletion}/>}
            </header>

            {
                activeDeletion && <InfoPopup
                    onCancel={onCancelDeletionClickHandler}
                    onAccept={onAcceptDeletionClickHandler}/>
            }
            <EditSerieForm/>
        </Card>
    )
}

export default ManageSeriePanel;

