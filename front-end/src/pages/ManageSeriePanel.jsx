import React, {useEffect, useState} from 'react'

import DeleteIcon from '@mui/icons-material/Delete';

import EditSerieForm from "../components/app/manageSerie/EditSerieForm";
import Card from "../components/ui/Card";
import InfoPopup from "../components/ui/popup/InfoPopup";
import IconBtn from "../components/ui/form/IconBtn";

import classes from './ManageSeriePanel.module.css'
import {useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";



const ManageSeriePanel = () => {

    const [activeDeletion, setActiveDeletion] = useState(false);
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
        // deleteRef.current.deleteSerie();
        // props.onDeletion(props.editingSerie)
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

