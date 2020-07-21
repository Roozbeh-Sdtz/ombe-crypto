import React, {useState} from "react";
import DropZone from "../Utill/DropZone";
import {
    Button,
    TextField,
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    makeStyles,
    createMuiTheme
} from "@material-ui/core";
import KeyboardBackspaceOutlinedIcon from '@material-ui/icons/KeyboardBackspaceOutlined';
import {ThemeProvider} from "@material-ui/styles";
import {Link, Redirect} from "react-router-dom";

import {decrypt_RSA} from '../../crypto/RSA'
import {encr1, encr2, pri} from '../../crypto/key'


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
    dropZone: {
        width: '100vh',
        marginTop: 20,

    },
    textField: {
        margin: 20,
        width: 500
    },
    backButton: {
        marginRight: theme.spacing(2),
    },
    title: {},

}))

export default function Decrypt() {
    const classes = useStyle()
    const [encryptedPass, setEncryptedPass] = useState('')
    const [privateKey, setPrivateKey] = useState('')
    const [redirect, setRedirect] = useState(false)

    const darkTheme = createMuiTheme({
        palette: {
            type: 'dark',
        },
    });

    if (redirect) {
        return <Redirect push to="/"/>;
    }
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
                            Decryption
                        </Typography>
                        <div className={classes.backButton} style={{width: 30}}/>
                    </Toolbar>
                </AppBar>

                <div
                    className={classes.dropZone}
                >
                    <DropZone/>
                </div>
                <TextField
                    id="passWord"
                    label="encrypted password"
                    className={classes.textField}
                    multiline
                    rows={4}
                    placeholder="enter your Encrypted password here"
                    variant="outlined"
                    value={encryptedPass}
                    onChange={value => {
                        setEncryptedPass(value.target.value)
                    }}
                />
                <TextField
                    id="privateKey"
                    label="private key"
                    className={classes.textField}
                    multiline
                    rows={4}
                    placeholder="enter your private Key here"
                    variant="outlined"
                    value={privateKey}
                    onChange={value => {
                        setPrivateKey(value.target.value)
                    }}
                />
                <Button variant="outlined" style={{margin: 20}}>Start</Button>

                <div onClick={() => {
                    console.log(decrypt_RSA(pri, encr2))
                }}>
                    decccc
                </div>
            </ThemeProvider>
        </div>
    )
}