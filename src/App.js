import React from "react";
import SimpleGrow from "./features/homePage/GrowingCards";
import {
    BrowserRouter as Router,
    Switch,
    Route,
} from "react-router-dom";
import Encrypt from "./features/Encrypt/Encrypt";
import Decrypt from "./features/Decrypt/Decrypt";
import CreateKey from "./features/CreateKey/CreateKey";
import {createMuiTheme} from "@material-ui/core";
import {ThemeProvider} from "@material-ui/styles";



function App() {

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

export default App