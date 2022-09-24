import React, {useRef, useState} from 'react'


import ManageSerieForm from "./ManageSerieForm";
import Card from "../../ui/Card";
import Info from "../../ui/info/Info";

import DeleteIcon from '@mui/icons-material/Delete';

import classes from './ManageSeriePanel.module.css'

const emptySerie = {
    id: '',
    title: '',
    session: '',
    episode: '',
    startDate: '',
    endDate: '',
    stars: '',
    createdDate: null
}

const ManageSeriePanel = (props) => {

    const [activeDeletion, setActiveDeletion] = useState(false);
    const deleteRef = useRef();

    const isEditing = () => {
        return props.editingSerie !== undefined;
    }
    const isAdd = () => {
        return props.editingSerie === undefined;
    }

    const onActivateDeletion = () => {
        setActiveDeletion(true);
    }

    const onAcceptDeletionClickHandler = () => {
        setActiveDeletion(false);
        deleteRef.current.deleteSerie();
        props.onDeletion(props.editingSerie)
    }

    const onCancelDeletionClickHandler = () => {
        setActiveDeletion(false);
    }


    return (
        <Card className={classes.card}>
            <header className={classes.card_header}>
                <h1>{props.title}</h1> {/* Global Styling in App.css */}
                {isEditing() && <DeleteIcon
                    onClick={onActivateDeletion}
                    className={classes.icon_hover}/>}
            </header>

            {
                activeDeletion && <Info
                    onCancel={onCancelDeletionClickHandler}
                    onAccept={onAcceptDeletionClickHandler}/>
            }
            {
                isEditing() && <ManageSerieForm
                    ref={deleteRef}
                    editingSerie={props.editingSerie}
                    cancelBtnLabel='Cancel'
                    submitBtnLabel='Editieren'
                    isEdit={props.editingSerie.isEdit}
                    onManagedSerie={props.onManagedSerie}
                    onCancel={props.onCancel}/>
            }
            {
                isAdd() && <ManageSerieForm
                    editingSerie={emptySerie}
                    cancelBtnLabel='Cancel'
                    submitBtnLabel='Add'
                    onManagedSerie={props.onManagedSerie}
                    isEdit='false'
                    onCancel={props.onCancel}/>
            }
        </Card>
    )
}

export default ManageSeriePanel;

