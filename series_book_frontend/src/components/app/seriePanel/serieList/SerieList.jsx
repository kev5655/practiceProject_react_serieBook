import React from "react";

import Serie from "./Serie";

const SerieList = (props) => {

    return (
        <>
            {props.serieList.map((serie) => (
                <Serie key={serie.title}
                       title={serie.title}
                       season={serie.season}
                       episode={serie.episode}
                       editSerie={props.editSerie}/>
            ))}

        </>
    );
}

export default SerieList;