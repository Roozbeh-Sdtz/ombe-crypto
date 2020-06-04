import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import {Link, Switch} from 'react-router-dom'
import {ThemeProvider} from "@material-ui/styles";
import {AppBar, createMuiTheme, IconButton, Toolbar, Typography} from "@material-ui/core";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";

const useStyles = makeStyles((theme) => ({
    root: {
        height: '100vh',
        backgroundColor: "#303030",
    },
    container: {
        display: 'flex',
        height: '100vh',
        alignItems: "center",
        justifyContent: "space-around",
    },
    paper: {
        margin: theme.spacing(1),
        border: '5px solid rgba(255, 255, 255, 0.12)',
        borderRadius: '15px',
        cursor: 'pointer',
    },
    card: {
        width: '20vh',
        height: '20vh',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: "center",
        lineHeight: '20vh',
        color: "#fff"
    },
}));

export default function SimpleGrow() {
    const classes = useStyles();
    const [checked, setChecked] = React.useState(true);

    const darkTheme = createMuiTheme({
        palette: {
            type: 'dark',
        },
    });

    return (
        <div className={classes.root}>
            <ThemeProvider theme={darkTheme}>
                <AppBar color={"#424242"}>
                    <Toolbar style={{display: 'flex', justifyContent: "center"}}>
                        <Typography variant="h6" className={classes.title}>
                            OMBE-cryptography
                        </Typography>
                    </Toolbar>
                </AppBar>
                <div className={classes.container}>
                    <Grow in={true}
                          style={{transformOrigin: '0 0 0'}}
                          {...(checked ? {timeout: 500} : {})}
                    >
                        <Paper elevation={0} className={classes.paper}>
                            <Link style={{textDecoration: 'none'}} to={"/encrypt"}>
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
                            <Link style={{textDecoration: 'none'}} to={"/create-key"}>
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
                            <Link style={{textDecoration: 'none'}} to={"/decrypt"}>
                                <div className={classes.card}>Decrypt</div>
                            </Link>
                        </Paper>
                    </Grow>
                </div>
            </ThemeProvider>
        </div>
    );
}