import { Movie, movies$ } from "../movies"
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { ALL } from "../App"
import { AppState } from "./app"

export interface MovieWithLike extends Movie {
    like?: boolean
}

export const fetchMovies = createAsyncThunk('movies/fetchMovies', async (arg, thunkAPI) => {
    const response = await movies$
    return response
})

const initialState = {
    movies: [] as MovieWithLike[],
    category: ALL
}

const moviesSlice = createSlice({
    name: 'movies',
    initialState,
    reducers: {
        deleteMovie: (state, action) => ({ ...state, movies: state.movies.filter(movie => movie.id !== action.payload.id) }),
        changeCategory: (state, action) => {
            state.category = action.payload.category
        },
        toggleLike: (state, action) => {
            return {
                ...state,
                movies: state.movies.map(movie => {
                    if (movie.id === action.payload.id) {
                        return { ...movie, like: !movie.like }
                    }
                    else return movie
                })
            }
        }
    },
    extraReducers: builder => {
        builder.addCase(fetchMovies.fulfilled, (state, action) => {
            state.movies.push(...action.payload)
        })
    }
})

export default moviesSlice.reducer

export const { deleteMovie, changeCategory, toggleLike } = moviesSlice.actions

export const selectMovies = (state: AppState) => state.movies.movies

export const selectCategory = (state: AppState) => state.movies.category