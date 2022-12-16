import React, {useState} from 'react'

import classes from "./Input.module.css"

const InputText = (props) => {
    
    const [text, setText] = useState(props.value ?? "");
    
    const onChangeHandler = (e) => {
        const value = e.target.value;
        setText(value)
        props.onChange(value)
    };

    return (
        <input
            className={`${classes.input} ${props.error && classes.error}`}
            type='text'
            name='textField'
            maxLength='50'
            value={text}
            placeholder={props.placeholder}
            onChange={onChangeHandler}
        />
    );
}

//export default InputText;