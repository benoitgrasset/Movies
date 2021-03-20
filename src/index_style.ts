import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'

export const useStyles = makeStyles((theme: Theme) => {

    return createStyles({
        root: {
            height: 500
        },
        container: {
            display: "flex",
            flexWrap: "wrap"
        },
        formControl: {
            margin: theme.spacing(1),
            minWidth: 120
        },
        buttonContainer: {
            "&>*": {
                margin: theme.spacing(1)
            }
        },
        stepper: {
            display: 'flex',
            flexDirection: "column",
            alignItems: "center",
            marginLeft: theme.spacing(2)
        },
        inputLabel: {
            minWidth: 150
        },
        pagination: {
            display: "flex",
            alignItems: "center",
            marginRight: theme.spacing(4)
        },
        header: {
            display: "flex",
            justifyContent: "space-between"
        }
    })
})