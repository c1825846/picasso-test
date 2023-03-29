import { useState } from 'react'
import { Stack, TextField, Button, Snackbar, Alert } from '@mui/material'
import axios from 'axios'
import { useMutation, useQueryClient } from '@tanstack/react-query'

import type { IComment } from '../types/Comment'

interface ISendCommentFromProps {
    postId: string,
}

export const SendCommentFrom = ({ postId }: ISendCommentFromProps) => {
    const queryClient = useQueryClient()
    const [commentName, setCommentName] = useState<string>('')
    const [commentEmail, setCommentEmail] = useState<string>('')
    const [commentBody, setCommentBody] = useState<string>('')
    const [isSnackbarOpen, setIsSnackbarOpen] = useState<boolean>(false)

    const clearForm = () => {
        setCommentName('')
        setCommentEmail('')
        setCommentBody('')
    }

    const { isLoading, isError, isSuccess, mutate } = useMutation({
        mutationFn: async () => {
            const result = await axios.post<IComment>('https://jsonplaceholder.typicode.com/comments', {
                postId,
                name: commentName,
                body: commentBody,
                email: commentEmail,
            })

            return result.data
        },
        onSuccess: (data) => {
            setIsSnackbarOpen(true)
            clearForm()
            queryClient.setQueryData(['comments', postId], (oldData?: IComment[]) => oldData ? [...oldData, data] : [data])
        }
    })

    return (
        <>
            <Snackbar open={isSnackbarOpen} autoHideDuration={6000} onClose={() => setIsSnackbarOpen(false)}>
                <Alert severity="success" sx={{ width: '100%' }}>
                    Комментарий добавлен
                </Alert>
            </Snackbar>
            <Stack spacing={1}>
                <TextField label="Title" value={commentName} onChange={e => setCommentName(e.target.value)} />
                <TextField label="Email" value={commentEmail} onChange={e => setCommentEmail(e.target.value)} />
                <TextField label="Body" multiline rows={5} value={commentBody} onChange={e => setCommentBody(e.target.value)} />
                <Button variant="contained" onClick={() => mutate()} disabled={isLoading}>Отправить</Button>
            </Stack>
        </>
    )
}