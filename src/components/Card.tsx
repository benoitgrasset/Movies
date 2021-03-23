import React from 'react'
import { Card as MUICard, CardHeader, CardContent, IconButton, Tooltip } from "@material-ui/core"
import { ThumbUp, Close } from "@material-ui/icons"
import ProgressBar from "./ProgressBar"
import { useStyles } from "./Card_style"

import { MovieWithLike } from '../redux'


const getColor = (isLiked?: boolean) => {
    switch (isLiked) {
        case true:
            return "primary"
        case false:
            return "secondary"
        default:
            return "inherit"
    }
}

const getTooltip = (isLiked?: boolean) => {
    switch (isLiked) {
        case true:
            return "Like"
        case false:
            return "Dislike"
        default:
            return ""
    }
}

interface CardProps extends MovieWithLike {
    onDelete: (id: string) => void
    handleLike: (id: string) => void
}

const Card: React.FunctionComponent<CardProps> = (props) => {

    const { title, category, likes, dislikes, onDelete, id, like: isLiked, handleLike } = props

    const classes = useStyles()

    const nbLikes = isLiked ? likes + 1 : likes
    const nbDislikes = (isLiked || isLiked === undefined) ? dislikes : dislikes + 1

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
                <div className={classes.likeButton}>
                    <Tooltip title={getTooltip(isLiked)}>
                        <IconButton onClick={() => handleLike(id)}>
                            <ThumbUp color={getColor(isLiked)} />
                        </IconButton>
                    </Tooltip>
                </div>
                <ProgressBar likes={nbLikes} dislikes={nbDislikes} />
            </CardContent>
        </MUICard>
    )
}


export default Card