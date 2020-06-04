import React, {useState, useEffect} from "react";
import DropZone from "../Utill/DropZone";
import {makeStyles} from "@material-ui/core/styles";
import MultilineTextField from "../Utill/MultilineTextField";
import {AppBar, Button, createMuiTheme, IconButton, Toolbar, Typography} from "@material-ui/core";
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Snackbar from "@material-ui/core/Snackbar";
import MuiAlert from '@material-ui/lab/Alert';
import {ThemeProvider} from "@material-ui/styles";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import {Redirect} from "react-router-dom";

const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#303030",
        height: '100vh'

    },
    dropZone: {
        width: '100vh',
        marginTop: 20,

    },
    inputKey: {
        marginTop: 20
    },
    textContainer: {
        border: "solid 1px",
        borderRadius: 5,
        minWidth: 200,
        justifyContent: "center",
        alignItems: "center"
    },
    text: {
        padding: 10,
        textAlign: "center"
    },
    passContainer: {
        display: "flex",
        width: 500,
        border: "2px solid",
        borderRadius: 5,
        margin: 10
    },
    pass: {
        margin: 10
    },
    backButton: {
        marginRight: theme.spacing(2),
    },
}))

function Alert(props) {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
}

export default function Encrypt() {
    const classes = useStyle()
    const [keyState, setKeyState] = useState(0) //0:default state  1:have userName State  2:doesnt have username state   3:wrong key state  4:loading    5:Done
    const [color, setColor] = useState('')
    const [text, setText] = useState('')
    const [value, setValue] = useState();
    const [pass, setPass] = useState()
    const [copy, setCopy] = useState(false)
    const [redirect, setRedirect] = useState(false)
    const handleChange = (event) => {
        setKeyState(4)
        setText('')
        setColor('')
        setValue(event.target.value);
        setCopy(false)
        //API call.then(handelState(result))
    };
    const handleState = (res) => {
        if (1) {//have username ===> res.username !== ''
            setKeyState(1)
            setColor('#5fe329')
            setText('Roozbeh')//res.username
        } else {
            setKeyState(2)
            setColor('#ffe600')
            setText("this key dose NOT have username")
        }
    }

    const handleClose = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }

        setCopy(false);
    };
    const darkTheme = createMuiTheme({
        palette: {
            type: 'dark',
        },
    });
    if (redirect) {
        return <Redirect push to="/"/>;
    }

    let textDisplay = text === '' ? 'none' : ''
    let loadingDisplay = keyState === 4 ? '' : 'none'
    let passDisplay = keyState === 5 ? '' : 'none'
    let startDisplay = (keyState === 1 || keyState === 2) ? '' : 'none'
    return (
        <div className={classes.root}>
            <ThemeProvider theme={darkTheme}>
                <AppBar color={"#424242"}>
                    <Toolbar style={{display: 'flex', justifyContent: "space-between"}}>
                        <IconButton edge="start" className={classes.backButton} color="inherit" aria-label="menu"
                                    onClick={() => {
                                        setRedirect(true)
                                    }}>
                            <KeyboardBackspaceOutlinedIcon/>
                        </IconButton>
                        <Typography variant="h6" className={classes.title}>
                            Encryption
                        </Typography>
                        <div className={classes.backButton} style={{width: 30}}/>
                    </Toolbar>
                </AppBar>

                <div
                    className={classes.dropZone}
                >
                    <DropZone/>
                </div>

                <div className={classes.inputKey}>
                    <MultilineTextField
                        style={{width: 500}}
                        id={"encrypt-pub-key"}
                        label={"public key"}
                        placeHolder={"Enter your public key"}
                        value={value}
                        onChange={handleChange}
                        color={keyState}
                    />
                </div>
                <div
                    className={classes.textContainer}
                    style={{borderColor: color, display: textDisplay}}
                >
                    <div className={classes.text}
                         style={{backgroundColor: color,}}
                    >
                        {text}
                    </div>
                </div>
                <div style={{display: loadingDisplay}}>
                    <img src={require('./103.gif')} style={{width: '50px', height: '50px'}}/>
                </div>
                <Button variant="outlined" style={{display: startDisplay}}>Start</Button>
                <div className={classes.passContainer} style={{borderColor: color, display: passDisplay}}>
                    <div className={classes.pass} style={{backgroundColor: color}}>
                        {pass}
                    </div>
                    <FileCopyOutlinedIcon
                        onClick={() => {
                            navigator.clipboard.writeText(pass).then(() => setCopy(true))
                        }}
                        style={{margin: 5, marginTop: 10, cursor: "pointer"}}
                    />
                </div>
                <Snackbar open={copy} autoHideDuration={6000} onClose={handleClose}>
                    <Alert onClose={handleClose} severity="success">
                        copied to clipboard!
                    </Alert>
                </Snackbar>
            </ThemeProvider>
        </div>
    )
}