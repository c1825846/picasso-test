import { useParams } from 'react-router-dom'
import axios from 'axios'
import { useQuery } from '@tanstack/react-query'

import { CommentList } from '../components/CommentList'
import { SendCommentFrom } from '../components/SendCommentFrom'
import { UserInfo } from '../components/UserInfo'
import { PostSkeleton } from '../components/PostSkeleton'

import type { IPost } from '../types/Post'

export const PostPage = () => {
    const { postId } = useParams()

    if (!postId) {
        return null
    }

    const fetchPostById = async (postId: string) => {
        const result = await axios.get<IPost>(`https://jsonplaceholder.typicode.com/posts/${postId}`)
        return result.data
    }

    const { isLoading, isError, data: post, error } = useQuery({
        queryKey: ['post', postId],
        queryFn: () => fetchPostById(postId),
    })

    if (isLoading) {
        return <PostSkeleton />
    }

    if (isError) {
        console.error(error)
        return <>Error</>
    }

    return (
        post &&
        <>
            <h1>{post.title}</h1>
            <p>{post.body}</p>
            <UserInfo userId={post.userId} />
            <CommentList postId={postId} />
            <SendCommentFrom postId={postId} />
        </>
    )
}