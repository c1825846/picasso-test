import { createBrowserRouter } from 'react-router-dom'

import { PostListPage } from '../pages/PostListPage'
import { PostPage } from '../pages/PostPage'

export const router = createBrowserRouter([
    {
        path: '/',
        Component: PostListPage,
    },
    {
        path: '/post/:postId',
        Component: PostPage,
    }
])