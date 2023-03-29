import { useState } from 'react'
import { SelectChangeEvent } from '@mui/material'

import { UserFilter } from '../components/UserFilter'
import { PostList } from '../components/PostList'

export const PostListPage = () => {
    const [selectedUserId, setSelectedUserId] = useState<string>('')

    const handleChandeSelectedUserId = (event: SelectChangeEvent) => {
        const userId = event.target.value
        setSelectedUserId(userId)
    }

    const handleResetFilter = () => {
        setSelectedUserId('')
    }

    return (
        <>
            <h1>Posts</h1>
            <UserFilter
                value={selectedUserId}
                onChange={handleChandeSelectedUserId}
                onReset={handleResetFilter}
            />
            <PostList userId={selectedUserId} />
        </>
    )
}