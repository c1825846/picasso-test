import { Skeleton, List, ListItem, ListItemText } from '@mui/material'

export const CommentSkeleton = () => (
    <List>
        <ListItem>
            <ListItemText
                primary={
                    <>
                        <Skeleton height={24} />
                        <Skeleton height={24} width="80%" />
                    </>
                }
                secondary={
                    <>
                        <Skeleton height={20} />
                        <Skeleton height={20} width="80%" />
                    </>
                }
            />
        </ListItem>
    </List>
)