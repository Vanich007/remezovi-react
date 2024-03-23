import type {PayloadAction} from "@reduxjs/toolkit"
import {createAppSlice} from "../../app/createAppSlice"
import type {AppThunk} from "../../app/store"
import {API_URL} from "../../api/api";
import {createSlice} from "@reduxjs/toolkit";


export interface Category {
    name: string;
    id: number
}
export interface Categories {
    categories: Category[];
}


export interface CategoriesState {
    categories: Category[];
    loading: boolean
}

const initialState: CategoriesState = {
    categories:[],
    loading: false,
}

// If you are not using async thunks you can use the standalone `createSlice`.
export const categories = createAppSlice({
    name: "categories",
    initialState,
    reducers: create => ({

        setCategories: create.reducer(
            (state, action: PayloadAction<Category[]>) => {
                state.categories = action.payload
            },
        ),
        fetchCategories: create.asyncThunk(
            async () => {
                const res = await fetch(`${API_URL}/categories/all`)
                return (await res.json()) as Category[]
            },
            {
                pending: (state) => {
                    state.loading = true
                },
                rejected: (state, action) => {
                    state.loading = false
                },
                fulfilled: (state, action) => {
                    state.loading = false
                    console.log('fulfilled action.payload', action.payload)
                    state.categories = (action.payload)
                },
            }
        ),
    }),

    selectors: {
        selectCategiries: state => state.categories,
    },

})

export const { fetchCategories} =
    categories.actions
export const {selectCategiries} = categories.selectors
