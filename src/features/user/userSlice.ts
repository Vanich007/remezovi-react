import type {PayloadAction} from "@reduxjs/toolkit"
import {createAppSlice} from "../../app/createAppSlice"
import type {AppThunk} from "../../app/store"
import {fetchCount} from "../counter/counterAPI";
import {API_URL} from "../../api/api";


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
export interface CreateUserDto {
    avatar: string;
    firstName: string;
    lastName: string;
    id: number;
}

export interface VkUserPayload {
    avatar: string
    avatar_base: string | null
    first_name: string
  id: number
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

        setUser: create.reducer(
            (state, action: PayloadAction<VkPayload>) => {
                state.user = action.payload.user
            },
        ),
        // addUser: create.asyncThunk(
        //     async (dto: createUserDto) => {
        //         console.log('addUser', dto)
        //         const response = await postData(`${API_URL}/users/add`, dto)
        //
        //         return response.data
        //     },
        //     {
        //         pending: state => {
        //             // state.status = "loading"
        //         },
        //         fulfilled: (state, action) => {
        //             // state.status = "idle"
        //             // state.value += action.payload
        //         },
        //         rejected: state => {
        //             // state.status = "failed"
        //         },
        //     },
        // ),
    }),

    // You can define your selectors here. These selectors receive the slice
    // state as their first argument.
    selectors: {
        selectAuth: state => state.auth,
        selectUser: state => state.user,
        selectUserId: state => state.user && state.user.id,
    },

})

export const { setUser} =
    users.actions
export const {selectAuth, selectUser, selectUserId} = users.selectors
