import React from 'react'
import { Card as MUICard, CardHeader, CardContent, IconButton, Tooltip } from "@material-ui/core"
import { ThumbUp, Close } from "@material-ui/icons"
import { Movie } from "../movies"
import ProgressBar from "./ProgressBar"
import { useStyles } from "./Card_style"


interface CardProps extends Movie {
    onDelete: (id: string) => void
}

const Card: React.FunctionComponent<CardProps> = (props) => {

    const { title, category, likes, dislikes, onDelete, id } = props

    const classes = useStyles()

    const [isLiked, setIsliked] = React.useState(true)

    const nbLikes = isLiked ? likes + 1 : likes
    const nbDislikes = isLiked ? dislikes : dislikes + 1

    const handleLike = () => {
        setIsliked(prevState => !prevState)
    }

    const color = isLiked ? "primary" : "secondary"

    return (
        <MUICard className={classes.card}>
            <CardHeader
                title={title}
                className={classes.cardTitle}
                action={
                    <Tooltip title="Delete">
                        <IconButton onClick={() => onDelete(id)}>
                            <Close />
                        </IconButton>
                    </Tooltip>
                }
            />
            <CardContent>
                <p>{`Category: ${category}`}</p>
                <p>{`Id: ${id}`}</p>
                <div className={classes.likeButton}>
                    <Tooltip title={isLiked ? "Like" : "Dislike"}>
                        <IconButton onClick={handleLike}>
                            <ThumbUp color={color} />
                        </IconButton>
                    </Tooltip>
                </div>
                <ProgressBar likes={nbLikes} dislikes={nbDislikes} />
            </CardContent>
        </MUICard>
    )
}


export default Card