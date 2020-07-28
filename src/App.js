import React, {useEffect, useState} from "react";
import SimpleGrow from "./features/homePage/GrowingCards";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Encrypt from "./features/Encrypt/Encrypt";
import Decrypt from "./features/Decrypt/Decrypt";
import CreateKey from "./features/CreateKey/CreateKey";
import {setWsGlobalAsync, wsIsOpen} from './app/wsSlice'
import {useDispatch, useSelector} from "react-redux";


function App() {

    const dispatch = useDispatch();

    const wsStore = useSelector((state) => state.wsGlobalStore);
    useEffect(() => {
        const ws = new WebSocket("wss://go-ie-99.herokuapp.com/websocket")
        ws.onopen = () => {
            dispatch(setWsGlobalAsync(ws))

            console.log("connection opened")
        }

    }, [])
    if (wsStore.isWsOpen === false) {
        return (
            <div>
                isLoading...
            </div>
        )
    } else {
        return (
            <Router>
                <Switch>
                    <Route path={"/encrypt"}>
                        <Encrypt/>
                    </Route>
                    <Route path={"/decrypt"}>
                        <Decrypt/>
                    </Route>
                    <Route path={"/create-key"}>
                        <CreateKey/>
                    </Route>
                    <Route path={"/"}>
                        <SimpleGrow/>
                    </Route>
                </Switch>
            </Router>
        )
    }
}

export default App