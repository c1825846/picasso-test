import { useState, useEffect } from 'react'
import { FormControl, InputLabel, Select, MenuItem, Button, SelectChangeEvent } from '@mui/material'
import axios from 'axios'

import type { IUser } from '../types/User'

interface IUserFilterProps {
    value: string,
    onChange: (event: SelectChangeEvent) => void,
    onReset: () => void,
}

export const UserFilter = ({ value, onChange, onReset }: IUserFilterProps) => {
    const [users, setUsers] = useState<IUser[]>([])

    const fetchUsers = async () => {
        const result = await axios.get('https://jsonplaceholder.typicode.com/users')
        setUsers(result.data)
    }

    useEffect(() => {
        fetchUsers()
    }, [])

    return (
        <FormControl fullWidth>
            <InputLabel id="select-user-label">Фильр по пользователю</InputLabel>
            <Select
                labelId='select-user-label'
                id='select-user'
                value={value}
                label="Фильр по пользователю"
                onChange={onChange}
            >
                {
                    users.map(user => (
                        <MenuItem value={user.id} key={user.id}>{user.name}</MenuItem>
                    ))
                }
            </Select>
            <Button onClick={onReset}>Сбросить фильр</Button>
        </FormControl>
    )
}