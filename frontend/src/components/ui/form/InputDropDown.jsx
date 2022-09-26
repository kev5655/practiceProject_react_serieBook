import React from 'react'
import FilterAltIcon from "@mui/icons-material/FilterAlt";

import inputStyles from './Input.module.css'

const InputDropDown = (props) => {

    let list = []
    Object.keys(props.optionList).forEach(function (key, index) {
        let element = props.optionList[key];
        list.push(element);
    })

    const onChange = (e) => {
        props.onChange(e.target.value);
    }

    return (
        <>
            <label>
                <p>{props.label}</p>
                <FilterAltIcon fontSize='small'/>
            </label>
            <select id={props.list}
                    className={inputStyles.input}
                    onChange={onChange}>
                {
                    list.map((option, key) => (
                        <option value={option} key={key}>{option.value}</option>
                    ))
                }
            </select>
        </>
    );
}


export default InputDropDown;

/*
<input list={props.list}
                       name={props.list + 'Selection'}
                        className={inputStyles.input}/>


 */