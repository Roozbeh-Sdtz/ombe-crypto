import React, {useState, useEffect} from "react";
import DropZone from "../Utill/DropZone";
import {makeStyles} from "@material-ui/core/styles";
import MultilineTextField from "../Utill/MultilineTextField";
import {AppBar, Button, createMuiTheme, IconButton, Toolbar, Typography} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";
import KeyboardBackspaceOutlinedIcon from "@material-ui/icons/KeyboardBackspaceOutlined";
import {Redirect} from "react-router-dom";

import JSZip from "jszip";
import {saveAs} from 'file-saver';

import {encrypt_RSA} from '../../crypto/RSA'
import {AES_encrypt} from '../../crypto/AES_code_decode'
import {useSelector} from "react-redux";

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


export default function Encrypt() {
    const classes = useStyle()
    const [keyState, setKeyState] = useState(2) //0:default state  1:have userName State  2:does'nt have username state   3:wrong key state  4:loading    5:Done
    const [color, setColor] = useState('')
    const [text, setText] = useState('')
    const [publicKey, setPublicKey] = useState('');
    const [redirect, setRedirect] = useState(false)
    const [files, setFiles] = useState('')
    const [AES, setAES] = useState({})
    const [encrypted_AES_pass_with_RSA, setEncrypted_AES_pass_with_RSA] = useState('')

    const ws = useSelector((state) => state.wsGlobalStore);
    let thisWs = ws;

    useEffect(() => {
        if (ws.wsGlobal !== 0) {
            thisWs.wsGlobal.onmessage = (res) => {
                const {action, message} = JSON.parse(res.data)

                    readIdentifierHandler(action,message)
            }
        }
    }, [ws])

    useEffect(() => {
        if (publicKey !== '' && ws.wsGlobal !== 0) {
            ws.wsGlobal.send(JSON.stringify({
                "action": "read_identifier",
                "parameters": [
                    {
                        "key": "key",
                        "value": publicKey
                    }
                ]
            }))

        }

    }, [publicKey])
    useEffect(() => {
        if (Object.keys(AES).length !== 0) {
            const AES_key_string = AES.key.toString()
            setEncrypted_AES_pass_with_RSA(encrypt_RSA(publicKey, AES_key_string))
        }
    }, [AES])

    useEffect(() => {
        if (encrypted_AES_pass_with_RSA !== '') {
            const zip = new JSZip();
            zip.file("data", AES.data)
            zip.file("key", encrypted_AES_pass_with_RSA)
            zip.generateAsync({type: "blob"}).then(function (content) {
                saveAs(content, "encrypted.zip")
            })


        }
    }, [encrypted_AES_pass_with_RSA])

    const readIdentifierHandler = (action,message) => {

        if (action === "read_identifier") {
            handleState(message)
        }else if(action === "read_identifier_not_exist"){
            handleState('')
        }
    }

    const handleChange = (event) => {
        // setKeyState(4)
        setText('')
        setColor('')
        setPublicKey(event.target.value);
        //API call.then(handelState(result))
    };
    const handleState = (res) => {
        if (res !== '') {//have username
            setKeyState(1)
            setColor('#5fe329')
            setText(res)//res.username
        } else {
            setKeyState(2)
            setColor('#ffe600')
            setText("this key dose NOT have username")
        }
    }


    const darkTheme = createMuiTheme({
        palette: {
            type: 'dark',
        },
    });
    if (redirect) {
        return <Redirect push to="/"/>;
    }

    const startAES = () => {
        if (publicKey == '') {
            return
        }
        const fileReader = new FileReader()
        fileReader.readAsArrayBuffer(files[0])
        fileReader.onload = function () {
            const u8 = new Uint8Array(fileReader.result)
            setAES(AES_encrypt(u8))

        }
    }


    let textDisplay = text === '' ? 'none' : ''
    let loadingDisplay = keyState === 4 ? '' : 'none'
    let passDisplay = keyState === 5 ? '' : 'none'
    let startDisplay = ((keyState === 1 || keyState === 2) && files.length > 0) ? '' : 'none'
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
                <text>
                    * only .zip
                </text>
                <div
                    className={classes.dropZone}
                >
                    <DropZone
                        setFiles={setFiles}
                    />
                </div>

                <div className={classes.inputKey}>
                    <MultilineTextField
                        style={{width: 500}}
                        id={"encrypt-pub-key"}
                        label={"public key"}
                        placeHolder={"Enter your public key"}
                        value={publicKey}
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
                <Button variant="outlined" style={{display: startDisplay,margin:25}}
                        onClick={() => {
                            startAES()
                        }}
                >Start</Button>


            </ThemeProvider>
        </div>
    )
}