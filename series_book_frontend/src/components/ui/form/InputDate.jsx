import React, {useState} from 'react'
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {styled} from "@mui/joy";

const InputDate = (props) => {

    let defaultValue = ""
    if (props.value !== undefined) {
        defaultValue = props.value
    }

    const [value, setValue] = useState(defaultValue);

    const onChangeHandler = (newValue) => {
        setValue(newValue);
        props.onChange(newValue)
    }

    const CssDatePicker = styled(DatePicker)({
        /* Label Color */
        '& .MuiFormLabel-root': {
            fontFamily: "\"JetBrains Mono\", sans-serif",
        },
        '& .MuiFormLabel-root.Mui-error': {
            color: '#555555 !important',
        },
        '& .MuiInputLabel-root': {
            color: '#780000 !important'
        },
        '& .MuiInputLabel-root:hover': {
            color: '#d32f2f !important'
        },
        '& .MuiInputLabel-shrink.Mui-focused': {
            color: '#d32f2f !important'
        },
        '& .MuiInputBase-inputAdornedEnd': {
            fontFamily: "\"JetBrains Mono\", sans-serif"
        },
        '& legend': {
            width: '110px'
        },

        /* Border Color when no Date inside */
        '& .Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: '#780000',
        },
        '& .Mui-error:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#d32f2f',
        },
        '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#d32f2f !important',
        },

        /* Border Color when Date inside */
        '& .MuiOutlinedInput-notchedOutline': {
            borderColor: '#780000'
        },
        '& .MuiOutlinedInput-notchedOutline:hover': {
            borderColor: '#d32f2f'
        }
    });

    const CssTextField = styled(TextField)({

    });

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssDatePicker
                label={props.label}
                value={value}
                inputFormat="DD/MM/YY"
                onChange={onChangeHandler}
                renderInput={(params) => <CssTextField {...params}/>}
            />
        </LocalizationProvider>
    )
}

export default InputDate;
