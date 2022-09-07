import React, {useState} from 'react'

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import Rating from "@mui/material/Rating";

const InputStars = (props) => {

    let stars = 0;
    if (props.value !== undefined) {
        stars = props.stars
    }

    const [value, setValue] = useState(parseInt(stars));

    const styles = {
        color: 'black',
        ...props.className,
    }

    return (
        <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
                props.stars(newValue)
            }}
            icon={<StarRoundedIcon fontSize="inherit"/>}
            emptyIcon={<StarOutlineRoundedIcon fontSize="inherit"/>}
            sx={styles}
        />
    );
}

export default InputStars;