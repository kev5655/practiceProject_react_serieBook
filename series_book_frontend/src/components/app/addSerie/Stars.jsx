import React, {useState} from 'react'
import {Rating} from "@mui/material";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import StarOutlineRoundedIcon from "@mui/icons-material/StarOutlineRounded";


const Stars = () => {

    const [value, setValue] = useState();

    return (
        <>
            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                style={{
                    color: 'black'
                }}
                sx={{
                    '& .MuiRating-iconFilled': {
                        color: 'red',
                    },
                    '& .MuiRating-iconFocus': {
                        color: 'orange',
                    },
                    '& .MuiRating-iconHover': {
                        color: 'green',
                    },
                }}
            />

            <Rating
                name="simple-controlled"
                value={value}
                onChange={(event, newValue) => {
                    setValue(newValue);
                }}
                icon={<StarRoundedIcon fontSize="inherit"/>}
                emptyIcon={<StarOutlineRoundedIcon fontSize="inherit"/>}
                style={{
                    color: 'black'
                }}
            />
        </>
    );
}

export default Stars;