import { useNavigate } from 'react-router-dom'
import { List, ListItemButton, ListItemText } from '@mui/material'
import { useQuery, useQueryClient } from '@tanstack/react-query'
import axios from 'axios'

import { PostSkeleton } from './PostSkeleton'
import { ErrorMessage } from './../ErrorMessage'

import type { IPost } from '../../types/Post'

interface IPostListProps {
    userId: string,
}

export const PostList = ({ userId }: IPostListProps) => {
    const navigate = useNavigate()
    const queryClient = useQueryClient()

    const fetchPosts = async (userId?: string) => {
        const params = userId ? { userId } : {}
        const result = await axios.get<IPost[]>('https://jsonplaceholder.typicode.com/posts', { params })
        console.log(result.data)
        return result.data
    }

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['posts', userId],
        queryFn: () => fetchPosts(userId),
    })

    const handlePostClick = (postId: number) => {
        navigate(`/post/${postId}`)
    }

    const handleReload = () => {
        queryClient.invalidateQueries({ queryKey: ['posts'] })
    }

    if (isLoading) {
        return <PostSkeleton />
    }

    if (isError) {
        console.error(error)
        return <ErrorMessage 
            message="Во время загрузки постов произошла ошибка"
            reloadFn={handleReload}
        />
    }

    return (
        <List>
            {data.map(post => (
                <ListItemButton key={post.id} onClick={() => handlePostClick(post.id)}>
                    <ListItemText primary={post.title} secondary={post.body} />
                </ListItemButton>
            ))}
        </List>
    )
}