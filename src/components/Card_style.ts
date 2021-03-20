import { makeStyles, Theme, createStyles } from "@material-ui/core/styles"


export const useStyles = makeStyles((theme: Theme) => {

    return createStyles({
        card: {
            width: 300,
            margin: theme.spacing(1),
            "&:hover": {
                boxShadow: theme.shadows[10]
            }
        },
        cardTitle: {
            fontWeight: "bold"
        },
        likeButton: {
            display: "flex",
            justifyContent: "flex-end"
        },
    })
})