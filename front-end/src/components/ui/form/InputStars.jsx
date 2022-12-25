import React, {useState} from 'react'

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import Rating from "@mui/material/Rating";

const InputStars = (props) => {

    let stars = parseInt(props.value ?? 0)

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