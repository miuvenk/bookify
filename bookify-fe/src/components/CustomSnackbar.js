import React, { useEffect } from 'react'
import { useSnackbar } from 'notistack'

const CustomSnackbar = ({ open, setOpen, severity, message }) => {

    const handleClose = () => {
        setOpen(false)
    }

    const { enqueueSnackbar, closeSnackbar } = useSnackbar();


    useEffect(() => {
        enqueueSnackbar(message, { variant: severity });
        setOpen(false)

    }, [enqueueSnackbar, severity])


    return (
        null
    )
}

export default CustomSnackbar