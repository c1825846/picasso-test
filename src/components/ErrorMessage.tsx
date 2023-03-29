import { useState } from 'react'
import { Button, Snackbar, Alert } from '@mui/material'

interface IErrorMessageProps {
    message: string,
    reloadFn: () => void,
}

export const ErrorMessage = ({ message, reloadFn }: IErrorMessageProps) => {
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(true)

    const handleCloseSnackbar = () => {
        setIsSnackbarOpen(false)
    }

    return (
        <>
            <Button fullWidth onClick={() => reloadFn()}>Перезагрузить</Button>
            <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                <Alert severity="error" sx={{ width: '100%' }}>
                    { message }
                </Alert>
            </Snackbar>
        </>
    )
}