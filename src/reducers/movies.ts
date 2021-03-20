import { ActionTypes, MoviesActions } from "../actions"
import { Movie } from "../movies"
import { AppState } from "../index"

const initialState: Array<Movie> = []

const movies = (state: Array<Movie> = initialState, action: any) => {
    switch (action.type) {
        case ActionTypes.DELETE_MOVIE:
            return state.filter(movie => movie.id !== action.id)
        default:
            return state
    }
}

export default movies


export const selectMovies = (state: AppState) => state