import React, {useContext, useState} from "react";

import Serie from "./Serie";
import DetailSerie from "../DetailSerie"
import BlurEffect from "../../../storage/blurEffect";


const SerieList = (props) => {

    const [detailSerie, setDetailSerie] = useState();

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
            {props.serieList.map((serie) => (
                <Serie key={serie.id}
                       id={serie.id}
                       title={serie.title}
                       session={serie.session}
                       episode={serie.episode}
                       startDate={serie.startDate}
                       endDate={serie.endDate}
                       createdDate={serie.createdDate}
                       lastModifiedDate={serie.lastModifiedDate}
                       stars={serie.stars}
                       editSerie={props.editSerie}
                       onClick={onSerieClickHandler}
                />
            ))}
            {globalBlur.isBlur && <DetailSerie
                serie={detailSerie}
                onClickOutside={onOutSideClickHandler}
            />}
        </>
    );
}

export default SerieList;