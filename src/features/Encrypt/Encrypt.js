import React from "react";
import DropZone from "../Utill/DropZone";
import {makeStyles} from "@material-ui/core/styles";
import MultilineTextField from "../Utill/MultilineTextField";

const useStyle = makeStyles((theme)=>({
    root:{
        display:"flex",
        flexDirection:"column",
        alignItems:"center",
        justifyContent:"center",

    },
    dropZone:{
        width:'100vh',
        marginTop:20,

    },
    inputKey:{
        marginTop:20
    }
}))

export default function Encrypt() {
    const classes = useStyle()
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
                    color={"secondary"}
                />
            </div>
        </div>
    )
}