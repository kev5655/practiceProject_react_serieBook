import React, {useContext, useState} from "react";

import Serie from "./Serie";
import DetailSerie from "../DetailSerie"
import BlurEffect from "../../../../store/blurEffect";

import classes from './SerieList.module.css'
import {useSelector} from "react-redux";


const SerieList = () => {

    const [detailSerie, setDetailSerie] = useState();
    const series = useSelector((state) => state.series.filteredItems)

    const globalBlur = useContext(BlurEffect)


    const onSerieClickHandler = (serie) => {
        globalBlur.activateBlur();
        setDetailSerie(serie);
    }

    const onOutSideClickHandler = () => {
        setTimeout(() => {
            globalBlur.deactivateBlur();
        }, 250);
    }


    return (
        <>
            {series.map((serie) => (
                <Serie key={serie.id}
                       serie={serie}
                       onClick={onSerieClickHandler}
                />
            ))}
            {
                series.isEmpty &&
                    <div className={classes.noSeries}><p>Please add a series via the plus symbol</p></div>
            }
            {globalBlur.isBlur && <DetailSerie
                serie={detailSerie}
                onClickOutside={onOutSideClickHandler}
            />}
        </>
    );
}

export default SerieList;