import React, {useState} from 'react'

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import Rating from "@mui/material/Rating";

const InputStars = (props) => {

    const [value, setValue] = useState();

    const styles = {
        color: 'black',
        ...props.className,
    }

    return(
        <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
                setValue(newValue);
            }}
            icon={<StarRoundedIcon fontSize="inherit"/>}
            emptyIcon={<StarOutlineRoundedIcon fontSize="inherit"/>}
            sx={styles}
        />
    );
}

export default InputStars;