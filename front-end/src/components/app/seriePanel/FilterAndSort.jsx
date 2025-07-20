import React from 'react'

import SearchIcon from '@mui/icons-material/Search';

import InputDropDown from "../../ui/form/InputDropDown";

import classes from './FilterAndSort.module.css'
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Input from "../../ui/form/Input.tsx";
import {useDispatch} from "react-redux";
import {searchSerie, sortSeries} from "../../../store/series-action";

export const SORT_PARAMS = {
    BY_ABC: {value: 'by ABC', id: 1, valueName: 'title'},
    BY_STARS: {value: 'by Stars', id: 2, valueName: 'stars'},
    BY_SESSION: {value: 'by Session', id: 3, valueName: 'session'},
    BY_EPISODE: {value: 'by Episode', id: 4, valueName: 'episode'},
    BY_LAST_MODIFIED: {value: 'by Last Modified', id: 5, valueName: 'lastModifiedDate'},
    BY_CREATED_DATE: {value: 'by Created Date', id: 6, valueName: 'createdDate'},
    BY_START_DATE: {value: 'by Start Date', id: 7, valueName: 'startDate'},
    BY_END_DATE: {value: 'by End Date', id: 8, valueName: 'endDate'},
}

let identifier = setTimeout(() => {});

const FilterAndSort = () => {

    const dispatch = useDispatch();

    const onEnteredSearchParam = (searchParam) => {
        clearTimeout(identifier);
        identifier = setTimeout(async () => {
            dispatch(searchSerie(searchParam))
        }, 200);
    }

    const onEnteredSortParam = (sortParam) => {
        dispatch(sortSeries(sortParam))
    }

    return (
        <section className={classes.card}>
            <div className={classes.flex_container}>
                <div className={classes.search_container}>
                    <label className={classes.lable}>
                        <p>Search</p>
                        <SearchIcon fontSize='small'/>
                    </label>
                    <Input
                        type='text'
                        name='searchParam'
                        placeholder='Search Series'
                        onChange={onEnteredSearchParam}/>
                </div>
                <div className={classes.sort_container}>
                    <label className={classes.lable}>
                        <p>Sort</p>
                        <FilterAltIcon fontSize='small'/>
                    </label>
                    <InputDropDown list='sort'
                                   onChange={onEnteredSortParam}
                                   optionList={SORT_PARAMS}/>
                </div>
            </div>
        </section>
    )
}

export default FilterAndSort;