import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"
import { ProgressBarProps } from "./ProgressBar"

export default makeStyles((theme: Theme) => {

    const barHeight = 7

    return createStyles({
        root: {
            background: theme.palette.error.main,
            height: barHeight,
            width: "100%",
            position: "relative",
            marginTop: theme.spacing(1)
        },
        bar: (props: ProgressBarProps) => {
            const { likes, dislikes } = props
            const value = likes / (likes + dislikes)
            return {
                background: theme.palette.primary.main,
                height: barHeight,
                width: `${(value > 1 ? 1 : value) * 100}%`,
                zIndex: 1,
                position: "absolute"
            }
        }
    })
})