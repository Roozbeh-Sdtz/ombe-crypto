import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';

const useStyles = makeStyles((theme) => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
}));

export default function MultilineTextField(props) {
    const classes = useStyles();
    const [value, setValue] = React.useState();

    const handleChange = (event) => {
        setValue(event.target.value);
    };

    return (
        <form className={classes.root} noValidate autoComplete="off">

            <div>
                <TextField
                    style={props.style}
                    color={props.color}
                    id={props.id}
                    label={props.label}
                    multiline
                    rows={4}
                    placeholder={props.placeHolder}
                    variant="outlined"
                    value={value}
                    onChange={handleChange}
                />
            </div>
        </form>
    );
}