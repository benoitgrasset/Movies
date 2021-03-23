import React from 'react'
import { useDispatch, useSelector } from "react-redux"
import {
  selectMovies, fetchMovies, deleteMovie, next, previous, selectCurrentPage,
  selectNbElements, changeElements, firstPage, selectCategory, changeCategory,
  toggleLike
} from "./redux"
import { Card } from "./components"
import { Select, MenuItem, FormControl, InputLabel, IconButton } from "@material-ui/core"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { useStyles } from "./index_style"


export const elements = [4, 8, 12]
export const ALL = "All"

const App: React.FunctionComponent<{}> = () => {

  const dispatch = useDispatch()

  React.useEffect(() => {
    dispatch(fetchMovies())
  }, [dispatch])

  const movies = useSelector(selectMovies)
  const currentPage = useSelector(selectCurrentPage)
  const nbElements = useSelector(selectNbElements)
  const category = useSelector(selectCategory)

  const categories = movies.reduce((acc, movie) => {
    if (!acc.includes(movie.category)) {
      return [...acc, movie.category]
    }
    else return acc
  }, [ALL])

  const filteredMovies = movies.filter(movie => category === ALL || movie.category === category)
  const nbMovies = filteredMovies.length
  const nbPages = Math.ceil(nbMovies / nbElements)

  // const updateCurrentPage = (nbMovies: number, nbElements: number) => {
  // const nbPages = Math.ceil(nbMovies / nbElements)
  // setPage(prevState => prevState >= nbPages ? nbPages : prevState)
  // }

  const handleChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    const category = event.target.value as string
    dispatch(changeCategory({ category }))
    // const nbMovies = movies.filter(movie => category === ALL || movie.category === category).length
  }

  const handleChangeElements = (event: React.ChangeEvent<{ value: unknown }>) => {
    const nbElements = event.target.value as number
    dispatch(changeElements({ nbElements }))
  }

  const firstElementIndex = (currentPage - 1) * nbElements
  const maxLastElementIndex = currentPage * nbElements
  const lastElementIndex = maxLastElementIndex > nbMovies ? nbMovies : maxLastElementIndex

  const visibleMovies = filteredMovies.slice(firstElementIndex, lastElementIndex)

  const onDelete = (id: string) => {
    dispatch(deleteMovie({ id }))
  }

  const handlePrevious = () => {
    currentPage > firstPage && dispatch(previous())
  }
  const handleNext = () => {
    currentPage < nbPages && dispatch(next())
  }

  const handleLike = (id: string) => {
    dispatch(toggleLike({ id }))
  }

  const classes = useStyles()

  return (
    <>
      <div className={classes.header}>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.inputLabel}>{"Category"}</InputLabel>
          <Select value={category}
            onChange={handleChangeCategory}
          >
            {categories.map(category => <MenuItem value={category}>{category}</MenuItem>)}
          </Select>
        </FormControl>
        <div className={classes.pagination}>
          <FormControl className={classes.formControl}>
            <InputLabel className={classes.inputLabel}>{"Elements per page"}</InputLabel>
            <Select value={nbElements}
              onChange={handleChangeElements}
            >
              {elements.map(element => <MenuItem value={element}>{element}</MenuItem>)}
            </Select>
          </FormControl>
          <div className={classes.stepper}>
            <div className={classes.buttonContainer}>
              <IconButton onClick={handlePrevious}><KeyboardArrowLeft /></IconButton>
              {currentPage}
              <IconButton onClick={handleNext}><KeyboardArrowRight /></IconButton>
            </div>
            <div>{`${firstElementIndex + 1}-${lastElementIndex} of ${nbMovies}`}</div>
          </div>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.container}>
          {visibleMovies.map(movie => <Card key={movie.id} {...movie} onDelete={onDelete} handleLike={handleLike} />)}
        </div>
      </div>
    </>
  );
}

export default App;
