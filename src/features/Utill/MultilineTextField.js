import React from 'react';
import {
    withStyles,
    makeStyles, createMuiTheme,
} from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    margin: {
        margin: theme.spacing(1),
    },
}));

export default function MultilineTextField(props) {
    const classes = useStyles();
    const CssTextField = withStyles({
        root: {
            '& .MuiOutlinedInput-root': {
                '& fieldset': {
                    borderColor:props.color,
                },
                '&:hover fieldset': {
                    borderColor:props.color,
                },
                '&.Mui-focused fieldset': {
                    borderColor:props.color,
                },
            },
        },
    })(TextField);

    return (
        <form className={classes.root} noValidate>
            <CssTextField
                className={classes.margin}
                style={props.style}
                id={props.id}
                label={props.label}
                multiline
                rows={4}
                placeholder={props.placeHolder}
                variant="outlined"
                value={props.value}
                onChange={props.onChange}
            />
        </form>
    );
}