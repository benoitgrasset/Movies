import { createSlice } from '@reduxjs/toolkit'
import { elements } from "../App"
import { AppState } from "./app"

export const firstPage = 1

const initialState = {
    currentPage: firstPage,
    nbElements: elements[1]
}


const paginationSlice = createSlice({
    name: 'pagination',
    initialState,
    reducers: {
        previous: (state) => {
            state.currentPage -= 1
        },
        next: (state) => {
            state.currentPage += 1
        },
        changeElements: (state, action) => {
            state.nbElements = action.payload.nbElements
        }
    },
    extraReducers: {
    }
})

export default paginationSlice.reducer

export const { previous, next, changeElements } = paginationSlice.actions

export const selectCurrentPage = (state: AppState) => state.pagination.currentPage
export const selectNbElements = (state: AppState) => state.pagination.nbElements