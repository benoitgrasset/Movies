import React from 'react'
import { movies$, Movie } from "./movies"
import Card from "./components/Card"
import { Select, MenuItem, FormControl, InputLabel, IconButton } from "@material-ui/core"
import { KeyboardArrowLeft, KeyboardArrowRight } from "@material-ui/icons";
import { useStyles } from "./index_style"


const ALL = "All"
const elements = [4, 8, 12]
const firstPage = 1

const App: React.FunctionComponent<{}> = () => {

  const [movies, setMovies] = React.useState<Array<Movie>>([])

  React.useEffect(() => {
    movies$.then((res: Movie[]) => setMovies(res))
  }, [setMovies])

  const categories = movies.reduce((acc, movie) => {
    if (!acc.includes(movie.category)) {
      return [...acc, movie.category]
    }
    else return acc
  }, [ALL])

  const [category, setCategory] = React.useState(ALL)
  const [page, setPage] = React.useState(firstPage)
  const [nbElements, setNbElements] = React.useState(elements[1])
  const nbMovies = movies.length
  const nbPages = Math.ceil(nbMovies / nbElements)

  const handleChangeCategory = (event: React.ChangeEvent<{ value: unknown }>) => {
    setCategory(event.target.value as string)
  }

  const handleChangeElements = (event: React.ChangeEvent<{ value: unknown }>) => {
    const nbElements = event.target.value as number
    setNbElements(nbElements)
    const nbPages = Math.ceil(nbMovies / nbElements)
    setPage(prevState => prevState >= nbPages ? nbPages : prevState)
  }

  const firstElementIndex = (page - 1) * nbElements
  const lastElementIndex = page * nbElements > nbMovies ? nbMovies : page * nbElements

  const visibleMovies = movies.filter(movie => category === ALL || movie.category === category)
    .slice(firstElementIndex, lastElementIndex)

  const onDelete = (id: string) => {
    setMovies(prevState => prevState.filter(movie => movie.id !== id))
  }

  const handlePrevious = () => {
    setPage(prevState => prevState <= firstPage ? firstPage : prevState - 1)
  }
  const handleNext = () => {
    setPage(prevState => prevState >= nbPages ? nbPages : prevState + 1)
  }

  const classes = useStyles()

  return (
    <>
      <div className={classes.header}>
        <FormControl className={classes.formControl}>
          <InputLabel className={classes.inputLabel}>Category</InputLabel>
          <Select value={category}
            onChange={handleChangeCategory}
          >
            {categories.map(category => <MenuItem value={category}>{category}</MenuItem>)}
          </Select>
        </FormControl>
        <div className={classes.pagination}>
          <FormControl className={classes.formControl}>
            <InputLabel className={classes.inputLabel}>Elements per page</InputLabel>
            <Select value={nbElements}
              onChange={handleChangeElements}
            >
              {elements.map(element => <MenuItem value={element}>{element}</MenuItem>)}
            </Select>
          </FormControl>
          <div className={classes.stepper}>
            <div className={classes.buttonContainer}>
              <IconButton onClick={handlePrevious}><KeyboardArrowLeft /></IconButton>
              {page}
              <IconButton onClick={handleNext}><KeyboardArrowRight /></IconButton>
            </div>
            <div>{`${firstElementIndex + 1}-${lastElementIndex} of ${nbMovies}`}</div>
          </div>
        </div>
      </div>
      <div className={classes.root}>
        <div className={classes.container}>
          {visibleMovies.map(movie => <Card key={movie.id} {...movie} onDelete={onDelete} />)}
        </div>
      </div>
    </>
  );
}

export default App;
