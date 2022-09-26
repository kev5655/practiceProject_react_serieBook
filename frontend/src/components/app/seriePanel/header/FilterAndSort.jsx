import React, {useState} from 'react'
import SearchIcon from '@mui/icons-material/Search';

import classes from './FilterAndSort.module.css'
import InputText from "../../../ui/form/InputText";
import InputDropDown from "../../../ui/form/InputDropDown";
import Btn from "../../../ui/form/Btn";

const SORT_PARAMS = {
    BY_ABC: {value: 'by ABC', id: 1},
    BY_STARS: {value: 'by Stars', id: 2},
    BY_SESSION: {value: 'by Session', id: 3},
    BY_EPISODE: {value: 'by Episode', id: 4},
    BY_LAST_MODIFIED: {value: 'by Last Modified', id: 5},
    BY_CREATED_DATE: {value: 'by Created Date', id: 6},
    BY_START_DATE: {value: 'by Start Date', id: 7},
    BY_END_DATE: {value: 'by End Date', id: 8},
}

const FilterAndSort = (props) => {

    let startSerieList = props.serieList;

    const [searchString, setSearchString] = useState("");
    const [sortParams, setSortParams] = useState(SORT_PARAMS.BY_ABC)

    const onEnteredSearchString = (str) => {
        setSearchString(str)
        onCompilingSerie(str)
    }

    const onEnteredSortParam = (sortParam) => {
        console.log("Sort by: " , sortParam)
        setSortParams(sortParam)
    }

    const onCompilingSerie = (searchString) => {
        let serieList = searchSerie(startSerieList, searchString)
        serieList = sortSerie(serieList, sortParams)
        props.onCompileSeire(serieList);
    }

    const searchSerie = (serieList, searchString) => {
        if(searchString === "") return serieList
        return serieList.filter((serie) => {
            let index = serie.title.toLowerCase().search(searchString.toLowerCase())
            return -1 !== index
        })
    }

    const sortSerie = (serie, sortParam) => {
        let sortedSerieList = serie.slice(0);
        switch (sortParam) {
            case SORT_PARAMS.BY_ABC:
                sortedSerieList.sort((a, b) => {
                    let x = a.title.toLowerCase();
                    let y = b.title.toLowerCase();
                    return x < y ? -1 : x > y ? 1 : 0;
                })
                break
            default:
                break

        }
        return sortedSerieList
    }

    return (
        <>
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
                <div className={classes.button}>
                <Btn label='Update'
                     onClick={onCompilingSerie}/>
                </div>
            </section>

        </>
    )
}

export default FilterAndSort;