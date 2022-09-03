import React, {useState} from 'react'
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import {DatePicker} from "@mui/x-date-pickers";
import TextField from "@mui/material/TextField";
import {LocalizationProvider} from "@mui/x-date-pickers/LocalizationProvider";
import {styled} from "@mui/joy";

const InputDate = (props) => {

    let defaultValue = ""
    if(props.value !== undefined){
        defaultValue = props.value
    }

    const [value, setValue] = useState(defaultValue);

    const CssTextField = styled(DatePicker)({
        /* Label Color */
        '& .MuiFormLabel-root': {
            color: '#555555 !important',
            fontFamily:"\"JetBrains Mono\", sans-serif",
        },
        '& .MuiInputLabel-shrink': {
            color: '#d32f2f !important'
        },
        '& .MuiInputBase-inputAdornedEnd': {
            fontFamily:"\"JetBrains Mono\", sans-serif"
        },
        '& .css-1in441m': {
            width: '110px'
        },

        /* Border Color */
        '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: '#780000',
        },
        '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-error:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: '#c1121f',
        },
        '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: '#c1121f',
        }
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
                renderInput={(params) => <TextField {...params}/>}
            />
        </LocalizationProvider>
    )
}

export default InputDate;