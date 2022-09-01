import React, {useState} from 'react'

import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";
import Rating from "@mui/material/Rating";

const InputStars = (props) => {

    const [value, setValue] = useState(0);

    const styles = {
        color: 'black',
        ...props.className,
    }

    return(
        <Rating
            name="simple-controlled"
            value={value}
            onChange={(event, newValue) => {
                let starValues = [0,0,0,0,0]
                for (let i = 0; i < starValues.length; i++) {
                    if(newValue > i){
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