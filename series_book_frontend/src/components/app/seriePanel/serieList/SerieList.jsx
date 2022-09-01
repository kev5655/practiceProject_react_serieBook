import React from "react";

import Serie from "./Serie";

const SerieList = (props) => {

    return (
        <>
            <Serie
                title={props.serieList[0].title}
            />
            {props.serieList.map((serie) => {
                <Serie
                    key={serie.title}
                    title={serie.title}
                    season={serie.season}


                />
            })}

        </>
    );
}

export default SerieList;