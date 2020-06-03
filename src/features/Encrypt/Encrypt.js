import React from "react";
import DropZone from "../Utill/DropZone";
import {makeStyles} from "@material-ui/core/styles";
import MultilineTextField from "../Utill/MultilineTextField";

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
    notchedOutline: {
        borderColor: "#5ee226 !important"
    }
}))

function notchColorHandler(keyState) {
    switch (keyState) {
        case 0:
            return {}
        case 1:
            return {borderColor: "#5ee226 !important"}
        case 2:
            return {borderColor: "#5ee226 !important"}
        case 3:
            return {borderColor: "#5ee226 !important"}
        default:return {}
    }
}

export default function Encrypt() {
    const classes = useStyle()
    const [keyState, setKeyState] = React.useState(0) //0:default state  1:have userName State  2:doesnt have username state   3:wrong key staet
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
                    notchedOutline={classes.notchedOutline}
                    id={"encrypt-pub-key"}
                    label={"public key"}
                    placeHolder={"Enter your public key"}
                    color={""}
                />
            </div>
        </div>
    )
}