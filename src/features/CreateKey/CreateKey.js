import React, {useEffect, useState} from "react";
import {
    AppBar,
    createMuiTheme,
    IconButton,
    makeStyles,
    Toolbar,
    Typography,
    Dialog,
    DialogTitle,
    DialogContent,
    TextField,
    DialogContentText,
    DialogActions,
    Button
} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import {Redirect} from "react-router-dom";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import FingerprintIcon from '@material-ui/icons/Fingerprint';
import FileCopyOutlinedIcon from '@material-ui/icons/FileCopyOutlined';
import Snackbar from "@material-ui/core/Snackbar";

import {generate_RSA_Keys} from '../../crypto/RSA'
import MuiAlert from "@material-ui/lab/Alert";

import JSZip from "jszip";
import {saveAs} from 'file-saver';
import {useDispatch, useSelector} from "react-redux";
import {setWsGlobalAsync, testPlus} from '../../app/wsSlice'


const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        flexGrow: 1,
        backgroundColor: "#303030",
        height: '100vh'
    },
    backButton: {
        marginRight: theme.spacing(2),
    },
    key: {
        display: "flex",
        alignItems: "center",
        justifyContent: 'center'
    },
    keyContainer: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center"
    }
}))

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});


export default function CreateKey(props) {
    const [redirect, setRedirect] = useState(false);
    const [open, setOpen] = React.useState(true);
    const [modalText, setModalText] = useState('');
    const [id, setID] = useState('');
    const [isIdUnique, setIsIdUnique] = useState(true);
    const [copy, setCopy] = useState(false);

    const [prvKey, setPrvKey] = useState('');
    const [pubKey, setPubKey] = useState('');
    const ws = useSelector((state) => state.wsGlobalStore.wsGlobal);
    let thisWs = ws;
    const dispatch = useDispatch();
    useEffect(() => {
        let genKeys = generate_RSA_Keys('512');
        setPrvKey(genKeys.pubKey);
        setPubKey(genKeys.prvKey);
    }, []);

    useEffect(() => {
        if (ws !== 0) {
            thisWs.onmessage = (res) => {
                console.log(res)
            }
        }
    }, [ws])

    useEffect(() => {
        if (ws !== 0 && pubKey !== '') {
            ws.send(JSON.stringify({
                "action": "insert",
                "parameters": [
                    {
                        "key": "identifier",
                        "value": {id}
                    },
                    {
                        "key": "key",
                        "value": {pubKey}
                    }
                ]
            }))

        }


    }, [id])


    const classes = useStyle()

    if (redirect) {
        return <Redirect push to="/"/>;
    }


    const handleClickOpen = () => {
        setOpen(true);
        setModalText(id)
    };

    const handleClose = () => {
        setOpen(false);

    };

    function Alert(props) {
        return <MuiAlert elevation={6} variant="filled" {...props} />;
    }

    const handleCloseSnackbar = () => {
        setCopy(false)
    }

    let uniqueTextDisplay = isIdUnique ? 'none' : ''
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
                        <Typography variant="h6" className={classes.title} onClick={handleClickOpen}>
                            create Key
                        </Typography>

                        <FingerprintIcon className={classes.backButton} onClick={handleClickOpen}/>
                    </Toolbar>
                </AppBar>

                <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                    <DialogTitle id="form-dialog-title">ID</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            To set unique ID to this public key, please enter your unique ID here. or click SKIP
                        </DialogContentText>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="ID"
                            label="ID (optional)"
                            type="text"
                            fullWidth
                            color={isIdUnique ? "primary" : "secondary"}
                            value={modalText}
                            onChange={(value) => {
                                setModalText(value.target.value)
                            }}
                        />
                        <div style={{display: uniqueTextDisplay, color: "#ff0057", margin: 10}}>this id has already been
                            registered
                        </div>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            skip
                        </Button>
                        <Button
                            onClick={() => { //TODO  this onClick call an API and if that succeed we will close modal else we set isIdUnique to false
                                setID(modalText);

                            }}
                            color="primary"
                        >
                            Set
                        </Button>
                    </DialogActions>
                </Dialog>

                <div className={classes.keyContainer}>
                    <div className={classes.key}>

                        <TextField
                            style={{width: '35vw', margin: 20}}
                            id={"encrypt-pri-key"}
                            label={"private key"}
                            fullWidth={true}
                            multiline
                            value={prvKey}
                        />
                        <FileCopyOutlinedIcon

                            onClick={() => {
                                navigator.clipboard.writeText(prvKey).then(() => setCopy(true))
                            }}
                            style={{margin: 5, marginTop: 10, cursor: "pointer"}}
                        />

                    </div>
                    <div className={classes.key}>

                        <TextField
                            style={{width: '35vw', margin: 20}}
                            id={"encrypt-pub-key"}
                            label={"public key"}
                            className={classes.key}
                            fullWidth={true}
                            multiline
                            rowsMax={10}
                            value={pubKey}

                        />
                        <FileCopyOutlinedIcon

                            onClick={() => {
                                navigator.clipboard.writeText(pubKey).then(() => setCopy(true))
                            }}
                            style={{margin: 5, marginTop: 10, cursor: "pointer",}}
                        />
                    </div>

                    <Button variant="outlined"

                            onClick={() => {
                                const zip = new JSZip
                                zip.file("public_key.txt", pubKey)
                                zip.file("private_key.txt", prvKey)
                                zip.generateAsync({type: "blob"}).then(function (content) {
                                    saveAs(content, "keys.zip")
                                })

                            }}
                    >
                        download as text file
                    </Button>

                    <div onClick={() => {

                        dispatch(testPlus())

                    }}>
                        {ws.testKeeper}
                    </div>
                    <Snackbar open={copy} autoHideDuration={6000} onClose={handleCloseSnackbar}>
                        <Alert onClose={handleCloseSnackbar} severity="success">
                            copied to clipboard!
                        </Alert>
                    </Snackbar>
                </div>
            </ThemeProvider>
        </div>
    )
}
