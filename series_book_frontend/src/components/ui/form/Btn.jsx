import React from 'react'

import Button from '@mui/material/Button';

const Btn = (props) => {

    const style = {
        backgroundColor: '#780000',
        '&:hover': {
            backgroundColor: '#c1121f'
        },
        ...props.className,
    }

    return(
        <Button
            sx={style}
            type={props.submitValue}
            variant="contained">
            {props.label}
        </Button>
    )
}

export default Btn;