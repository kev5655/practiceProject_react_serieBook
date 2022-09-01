import React, {useState} from 'react'
import TextField from "@mui/material/TextField";

import './InputNumber.module.css'
import {styled} from "@mui/joy";

const InputNumber = (props) => {

    const CssTextField = styled(TextField)({
        '& label.Mui-focused': {
            color: '#c1121f',
            borderWidth: '0.15rem'
        },
        '& .MuiInput-underline:after': {
            borderBottomColor: '#c1121f',
            borderWidth: '0.15rem'

        },
        '& .MuiOutlinedInput-root': {
            '& fieldset': {
                borderColor: '#780000',
            },
            '&:hover fieldset': {
                borderColor: '#c1121f',
            },
            '&.Mui-focused fieldset': {
                borderColor: '#c1121f',
                borderWidth: '0.15rem'
            },
        },
    });

    const [number, setNumber] = new useState();

    const isValidate = (event) => {
        return parseInt(event.target.value) >= 1;
    }

    const onChangeHandler = (e) => {
        //e.preventDefault();
        setNumber(e.target.value)
        if(isValidate(e)){
            props.onChange(e.target.value)
        }else{
            e.target.value = 1;
        }
    }

    const onKeyDownHandler = (e) => {
        if(e.key === "Backspace"){
            e.target.value = "";
        }
    }

    return (
        <CssTextField
            placeholder={props.placeholder}
            type='number'
            margin='none'
            size='small'
            fullWidth={true}
            value={number}
            sx={props.className}
            onChange={(e) => {onChangeHandler(e);}}
            onKeyDown={(e) => {onKeyDownHandler(e);}}

        />

    )
}

export default InputNumber;