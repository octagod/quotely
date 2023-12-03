import { createSlice } from '@reduxjs/toolkit'

export const userSlice = createSlice({
    name: 'user',
    initialState: {value: {name: "", email: ""}},
    reducers: {
        updateuser: (state, action) => {
            state.value = action.payload
        }
    }
})

export const {updateuser} = userSlice.actions

export default userSlice.reducer