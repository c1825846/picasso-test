import { Skeleton } from '@mui/material'

export const PostSkeleton = () => {
    return (
        <>
            <Skeleton sx={{ height: '30px', width: '90%'}} />
            <Skeleton sx={{ height: '30px', width: '30%'}} />
            <Skeleton sx={{ height: '18px'}} />
            <Skeleton sx={{ height: '18px'}} />
            <Skeleton sx={{ height: '18px', width: '40%'}} />
        </>
    )
}