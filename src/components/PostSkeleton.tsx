import { Skeleton, Typography } from "@mui/material"

export const PostSkeleton = () => {
    return (
        <>
            <Typography variant="h1"><Skeleton /></Typography>
            <Typography variant="body1"><Skeleton /></Typography>
            <Typography variant="body1"><Skeleton /></Typography>
            <Typography variant="body1"><Skeleton /></Typography>
        </>
    )
}