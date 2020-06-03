import React, {useState, useEffect} from "react";
import DropZone from "../Utill/DropZone";
import {makeStyles} from "@material-ui/core/styles";
import MultilineTextField from "../Utill/MultilineTextField";
import {Button} from "@material-ui/core";

const useStyle = makeStyles((theme) => ({
    root: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",

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
        borderRadius:5,
        minWidth:200,
        justifyContent:"center",
        alignItems:"center"
    },
    text: {
        padding:10,
        textAlign:"center"
    }
}))


export default function Encrypt() {
    const classes = useStyle()
    const [keyState, setKeyState] = useState(4) //0:default state  1:have userName State  2:doesnt have username state   3:wrong key state  4:loading    5:Done
    const [color, setColor] = useState('')
    const [text, setText] = useState('ho')
    const [value, setValue] = useState();
    const handleChange = (event) => {
        setKeyState(4)
        setText('')
        setColor('')
        setValue(event.target.value);
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
    let textDisplay = text === '' ? 'none' : ''
    let loadingDisplay = keyState === 4 ? '' : 'none'
    return (
        <div className={classes.root}>
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
                style={{borderColor: color,display:textDisplay}}
            >
                <div className={classes.text}
                    style={{backgroundColor:color,}}
                >
                    {text}
                </div>
            </div>
            <div style={{display:loadingDisplay}}>
                <img src={require('./103.gif')} style={{width: '50px', height: '50px'}}/>
            </div>
            {/* eslint-disable-next-line react/jsx-no-undef */}
            <Button variant="outlined">Start</Button>
            <div>

            </div>
        </div>
    )
}