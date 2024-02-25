import type {PayloadAction} from "@reduxjs/toolkit"
import {createAppSlice} from "../../app/createAppSlice"
import type {AppThunk} from "../../app/store"

export interface VkPayload {
    auth: number;
    token: string;
    hash: string;
    ttl: number;
    type: string;
    uuid: string;
    loadExternalUsers?: boolean;
    user: VkUserPayload
}

export interface VkUserPayload {
    avatar: string
    avatar_base: string | null
    first_name: string
  id: 7198731
  last_name: string
  phone: string
}

export interface UsersState {
    auth: number;
    token: string;
    ttl: number;
    type: string;
    uuid: string;
    loadExternalUsers?: boolean;
    user: VkUserPayload | null
}

const initialState: UsersState = {
    auth: 0,
    token: '',
    ttl: 0,
    type: '',
    uuid: '',
  user: null

}

// If you are not using async thunks you can use the standalone `createSlice`.
export const users = createAppSlice({
    name: "users",
    // `createSlice` will infer the state type from the `initialState` argument
    initialState,
    // The `reducers` field lets us define reducers and generate associated actions
    reducers: create => ({
        increment: create.reducer(state => {
            // Redux Toolkit allows us to write "mutating" logic in reducers. It
            // doesn't actually mutate the state because it uses the Immer library,
            // which detects changes to a "draft state" and produces a brand new
            // immutable state based off those changes
            // state.value += 1
        }),
        decrement: create.reducer(state => {
            // state.value -= 1
        }),
        // Use the `PayloadAction` type to declare the contents of `action.payload`
        setUser: create.reducer(
            (state, action: PayloadAction<VkPayload>) => {
                console.log('setUser action', action)
                state.user = action.payload.user
            },
        ),
    }),
    // You can define your selectors here. These selectors receive the slice
    // state as their first argument.
    selectors: {
        selectAuth: state => state.auth,
        selectUser: state => state.user,
        selectUserId: state => state.user && state.user.id,
    },

})

export const {decrement, increment, setUser} =
    users.actions
export const {selectAuth, selectUser, selectUserId} = users.selectors
