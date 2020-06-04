import React, {useState} from "react";
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
}))

const darkTheme = createMuiTheme({
    palette: {
        type: 'dark',
    },
});


export default function CreateKey() {
    const [redirect, setRedirect] = useState(false)
    const [open, setOpen] = React.useState(true);
    const [modalText, setModalText] = useState('');
    const [id, setID] = useState('')
    const [isIdUnique, setIsIdUnique] = useState(true)
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
                                handleClose()
                            }}
                            color="primary"
                        >
                            Set
                        </Button>
                    </DialogActions>
                </Dialog>
            </ThemeProvider>
        </div>
    )
}
