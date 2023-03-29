import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'
import { List, ListItem, ListItemText } from '@mui/material'

import { CommentSkeleton } from './CommentSkeleton'
import { ErrorMessage } from '../ErrorMessage'

import type { IComment } from '../../types/Comment'

interface ICommentListProps {
    postId: string,
}

export const CommentList = ({ postId }: ICommentListProps) => {
    const queryClient = useQueryClient()

    const fetchCommentsByPostId = async (postId: string) => {
        const result = await axios.get<IComment[]>(`https://jsonplaceholder.typicode.com/comments?postId=${postId}`)
        return result.data
    }

    const { isLoading, isError, data: comments, error } = useQuery({
        queryKey: ['comments', postId],
        queryFn: () => fetchCommentsByPostId(postId),
    })

    const handleReload = () => {
        queryClient.invalidateQueries({ queryKey: ['comments'] })
    }

    if (isLoading) {
        return <CommentSkeleton />
    }

    if (isError) {
        console.error(error)
        return <List>
            <ListItem >
                <ListItemText primary={
                    <ErrorMessage
                        message="Во время загрузки комментариев произошла ошибка"
                        reloadFn={handleReload}
                    />
                } />
            </ListItem>
        </List>
    }

    return (
        <List>
            {
                comments.map(comment => (
                    <ListItem key={comment.id}>
                        <ListItemText primary={`${comment.name} | ${comment.email}`} secondary={comment.body} />
                    </ListItem>
                ))
            }
        </List>
    )
}