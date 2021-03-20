import React from "react"
import clsx from "clsx"
import useStyles from "./ProgressBar_style"

export type ProgressBarProps = {
    likes: number
    dislikes: number
    className?: string
}

const ProgressBar: React.FunctionComponent<ProgressBarProps> = (props) => {

    const { className } = props
    const classes = useStyles(props)

    return (
        <div className={clsx(classes.root, className)}>
            <div className={classes.bar} />
        </div>
    )
}

export default ProgressBar