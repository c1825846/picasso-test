import { useQuery } from '@tanstack/react-query'
import axios from 'axios'
import { Skeleton } from '@mui/material'

import type { IUser } from '../types/User'

interface IUserInfoProps {
    userId: number,
}

export const UserInfo = ({ userId }: IUserInfoProps) => {
    const fetchUserById = async (userId: number) => {
        const result = await axios.get<IUser>(`https://jsonplaceholder.typicode.com/users/${userId}`)
        return result.data
    }

    const { isLoading, isError, data, error } = useQuery({
        queryKey: ['user', userId],
        queryFn: () => fetchUserById(userId),
    })

    if (isLoading) {
        return <Skeleton height={29}/>
    }

    if (isError) {
        console.error(error)
        return <>Error fetching user</>
    }

    return (
        <>
            {data.name}
        </>
    )
}