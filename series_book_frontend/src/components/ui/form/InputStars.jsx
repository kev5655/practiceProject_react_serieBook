import React, {useState} from 'react'

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import Rating from "@mui/material/Rating";

const InputStars = (props) => {

    let stars = 0;
    if (props.value !== undefined) {
        props.value.map((star) => {
            if (star === 1) {
                stars++;
            }
        })
    }

    const [value, setValue] = useState(stars);

    const styles = {
        color: 'black',
        ...props.className,
    }

    return (
        <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
                let starValues = [0, 0, 0, 0, 0]
                //ToDo add map(() => {})
                for (let i = 0; i < starValues.length; i++) {
                    if (newValue > i) {
                        starValues[i] = 1;
                    }
                }
                setValue(newValue);
                props.stars(starValues)
            }}
            icon={<StarRoundedIcon fontSize="inherit"/>}
            emptyIcon={<StarOutlineRoundedIcon fontSize="inherit"/>}
            sx={styles}
        />
    );
}

export default InputStars;