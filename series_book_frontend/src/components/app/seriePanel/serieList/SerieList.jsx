import React from "react";

import Serie from "./Serie";

const SerieList = (props) => {

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
                       stars={serie.stars}
                       editSerie={props.editSerie}
                />
            ))}
        </>
    );
}

export default SerieList;