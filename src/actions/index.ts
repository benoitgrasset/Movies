import { Movie, movies$ } from "../movies"

export enum ActionTypes {
    DELETE_MOVIE = 'DELETE_MOVIE',
    FETCH_MOVIES = 'FETCH_MOVIES',
    FETCH_MOVIES_SUCCESS = 'FETCH_MOVIES_SUCCESS'
}

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never

const syncActions = {
    fetchMoviesSuccess(movies: Array<Movie>) {
        return {
            type: ActionTypes.FETCH_MOVIES,
            movies
        }
    },
    deleteMovie(id: string) {
        return {
            type: ActionTypes.DELETE_MOVIE,
            id
        }
    }
}

export type MoviesActions = ReturnType<InferValueTypes<typeof syncActions>>

// const asyncActions = {
//     fetchMovies() {
//         return (dispatch: any) => {
//             return movies$.then(movies => {
//                 return dispatch(syncActions.fetchMoviesSuccess(movies))
//             })
//         }
//     }
// }

export const moviesActions = { ...syncActions, /*...asyncActions*/ }