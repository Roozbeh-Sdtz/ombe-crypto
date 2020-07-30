import React, {useEffect} from 'react';
import {makeStyles} from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grow from '@material-ui/core/Grow';
import {Link} from 'react-router-dom'
import {ThemeProvider} from "@material-ui/styles";
import {
    AppBar, Button,
    createMuiTheme, Dialog, DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle,
    Toolbar,
    Typography
} from "@material-ui/core";

import InfoIcon from '@material-ui/icons/Info';

import VerticalLinearStepper from '../Utill/Stepper'

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
    const [open, setOpen] = React.useState(false);

    const darkTheme = createMuiTheme({
        palette: {
            type: 'dark',
        },
    });
    const handleShow = () => {
        setOpen(true)
    }

    const handleClose = () => {
        setOpen(false)
    }
    return (
        <div className={classes.root}>
            <ThemeProvider theme={darkTheme}>
                <AppBar color={"#424242"}>

                    <Toolbar style={{display: 'flex', justifyContent: "space-between"}}>
                        <div/>
                        <Typography variant="h6" className={classes.title}>
                            OMBE-cryptography
                        </Typography>
                        <InfoIcon style={{cursor: 'pointer'}}
                                  onClick={handleShow}
                        />
                    </Toolbar>

                </AppBar>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">info</DialogTitle>
                    <DialogContent>
                        <DialogContentText> This is an open source cryptography application based on AES and RSA for all kinds of
                            file encryption and decryption right on your browser with straightforward steps.
                        </DialogContentText>
                        <VerticalLinearStepper/>

                        <div style={{display: "flex", flexDirection: "column"}}>
                            <a href={"https://github.com/guftall/go-ie-99"} target="_blank" style={{
                                textDecoration: "none",
                                color: "#fff",
                                margin: 10
                            }}>https://github.com/guftall/go-ie-99</a>
                            <a href={"https://github.com/Roozbeh2429/ombe-crypto"} target="_blank" style={{
                                textDecoration: "none",
                                color: "#fff",
                                margin: 10
                            }}>https://github.com/Roozbeh2429/ombe-crypto</a>
                        </div>

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => {
                            handleClose()
                        }}>
                            close
                        </Button>
                    </DialogActions>
                </Dialog>

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