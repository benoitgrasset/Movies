import { configureStore } from '@reduxjs/toolkit'
import movies from "./movies"
import pagination from "./pagination"

const rootReducer = {
    reducer: {
        movies,
        pagination
    }
}

export const appStore = configureStore(rootReducer)

export type AppState = ReturnType<typeof appStore.getState>