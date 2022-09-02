import React, {useState} from 'react'
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {styled} from "@mui/joy";

const InputDate = (props) => {

    const [value, setValue] = useState(props.value);

    const CssTextField = styled(DatePicker)({
        '& label.Mui-focused': {
            color: '#c1121f',
            borderWidth: '0.15rem'
        },
        '& label': {
            color: '#780000',
        },
        '& .css-14s5rfu-MuiFormLabel-root-MuiInputLabel-root.Mui-error': {
            color: '#555555',
        },
        '.css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: '#780000',
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

    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <CssTextField
                label={props.label}
                value={value}
                inputFormat="DD/MM/YY"
                onChange={(newValue) => {
                    setValue(newValue);
                    props.onChange(newValue)
                }}
                renderInput={(params) => <TextField {...params} />}
            />
        </LocalizationProvider>
    )

}

export default InputDate;