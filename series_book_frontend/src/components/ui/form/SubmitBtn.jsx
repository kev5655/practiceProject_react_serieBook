import React from 'react'

import Button from '@mui/material/Button';

const SubmitBtn = (props) => {

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
            type='submit'
            variant="contained">
            Add
        </Button>
    )
}

export default SubmitBtn;