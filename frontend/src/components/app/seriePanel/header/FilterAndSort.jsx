import React, {useEffect, useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';

import InputText from "../../../ui/form/InputText";
import InputDropDown from "../../../ui/form/InputDropDown";
import Btn from "../../../ui/form/Btn";
import {searchSerie, sortSerie} from "../../../utils/searchSort";

import classes from './FilterAndSort.module.css'

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

const FilterAndSort = (props) => {

    let startSerieList = props.serieList;
    const [isActive, setIsActive] = useState(props.isFilterActive);

    let searchInput = "";
    let sortParam = SORT_PARAMS.BY_LAST_MODIFIED;

    //const [searchString, setSearchString] = useState("");
    //const [sortParams, setSortParams] = useState(SORT_PARAMS.BY_ABC)

    useEffect(() => {
        console.log("useEffect: ", props.serieList)
        onEnteredSortParam(sortParam)
    }, [])

    useEffect(() => {
        setIsActive(props.isFilterActive)
    }, [props.isFilterActive])

    const onEnteredSearchString = (str) => {
        searchInput = str;
        onCompilingSerie();
    }

    const onEnteredSortParam = (sort_param) => {
        sortParam = sort_param;
        onCompilingSerie();
    }

    const onCompilingSerie = () => {
        let serieList = searchSerie(startSerieList, searchInput)
        //console.log("After Search: ", serieList);
        //console.log("by ", searchInput)
        serieList = sortSerie(serieList, sortParam)
        console.log("After Sorting: ", serieList)
        console.log("by " + JSON.stringify(sortParam))
        console.log()
        props.onCompileSeire(serieList);
    }


    return (
        isActive &&
        <section className={classes.card}>
            <div className={classes.flex_container}>
                <div className={classes.search_container}>
                    <label>
                        <p>Search</p>
                        <SearchIcon fontSize='small'/>
                    </label>
                    <InputText
                        onChange={onEnteredSearchString}/>
                </div>
                <div className={classes.sort_container}>
                    <InputDropDown label='Sort'
                                   list='sort'
                                   onChange={onEnteredSortParam}
                                   optionList={SORT_PARAMS}/>
                </div>
            </div>
        </section>
    )
}

export default FilterAndSort;

/*
<div className={classes.button}>
                        <Btn label='Update'
                             onClick={onCompilingSerie}/>
                    </div>
 */