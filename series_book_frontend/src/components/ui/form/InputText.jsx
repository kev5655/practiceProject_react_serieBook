import React from 'react'
import TextField from "@mui/material/TextField";

import {styled} from "@mui/joy";


const CssTextField = styled(TextField)({
    "& input::placeholder": {
        fontFamily:"\"JetBrains Mono\", sans-serif"
    },
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

const InputText = (props) => {
    const onChangeHandler = (e) => {
        const value = e.target.value;
        if(value !== ""){
            props.onChange(value)
        }
    };

    return (
        <>
            <CssTextField
                placeholder={props.placeholder}
                value={props.value}
                type='text'
                margin='none'
                size='small'
                fullWidth={true}
                onChange={onChangeHandler}
            />
        </>
    );
}

export default InputText;
