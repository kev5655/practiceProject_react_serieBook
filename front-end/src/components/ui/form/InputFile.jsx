import React, {forwardRef, useImperativeHandle, useRef, useState} from "react";

import classes from "./Input.module.css"

const InputFile = forwardRef((props, ref) => {
    const {id, name, fileType} = props;

    const [label, setLabel] = useState("Select CSV File");
    const inputRef = useRef();

    const onChangeFile = (event) => {
        let label = event.target.value.split("\\");
        label = label[label.length-1];
        console.log(label)
        setLabel(label);
    }

    useImperativeHandle(ref, () => ({
        onReset: () => {
            setLabel("Select CSV File");
            console.log(inputRef.current)
        }
    }));

    // "text/csv"

    return (

        <label htmlFor={id} className={classes.inputFile}>{label}
            <input className={classes.file} type="file"
                   onInput={onChangeFile}
                   id={id} name={name}
                   accept={fileType} ref={inputRef}/>
        </label>

    );
})

export default InputFile;