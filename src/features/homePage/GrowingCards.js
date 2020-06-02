import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import {Link} from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
    },
    container: {
        display: 'flex',
        height: '100vh',
        alignItems: "center",
        justifyContent: "space-around",
    },
    paper: {
        margin: theme.spacing(1),
    },
    card: {
        width: '20vh',
        height: '20vh',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        lineHeight: '20vh',
        border: '5px solid #000',
        borderRadius: '15px',
        cursor: 'pointer',
        color:'#000',
    },
}));

export default function SimpleGrow() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(true);


    return (
        <div className={classes.root}>
            <div className={classes.container}>
                <Grow in={true}
                      style={{transformOrigin: '0 0 0'}}
                      {...(checked ? {timeout: 500} : {})}
                >
                    <Paper elevation={0} className={classes.paper}>
                        <Link style={{textDecoration:'none'}} to={"/encrypt"}>
                            <div className={classes.card}>
                                Encrypt
                            </div>
                        </Link>
                    </Paper>
                </Grow>
                <Grow
                    in={true}
                    style={{transformOrigin: '0 0 0'}}
                    {...(checked ? {timeout: 1500} : {})}
                >
                    <Paper elevation={0} className={classes.paper}>
                        <Link style={{textDecoration:'none'}} to={"/create-key"}>
                            <div className={classes.card}>create key</div>
                        </Link>
                    </Paper>
                </Grow>
                <Grow
                    in={true}
                    style={{transformOrigin: '0 0 0'}}
                    {...(checked ? {timeout: 2000} : {})}
                >
                    <Paper elevation={0} className={classes.paper}>
                        <Link style={{textDecoration:'none'}} to={"/decrypt"}>
                            <div className={classes.card}>Decrypt</div>
                        </Link>
                    </Paper>
                </Grow>
            </div>
        </div>
    );
}