import React from "react"
import {Route, Switch, Redirect} from "react-router-dom";
import {Home} from "./components/Home";
import {ColumnList} from "./components/ColumnList";
import {AuthPage} from "./components/AuthPage";
import {RegisterPage} from "./components/RegisterPage";


export const userRoutes = isAuth => {
    if (isAuth){
        return(
            <Switch>
                <Route path="/" exact><Home/> </Route>
                <Route path="/tasks"><ColumnList/> </Route>
                <Redirect to="/" />
            </Switch>
        )
    }
    return(
        <Switch>
            <Route path="/" exact><AuthPage/> </Route>
            <Route path="/auth"><AuthPage/> </Route>
            <Route path="/register"><RegisterPage/> </Route>
            <Redirect to="/" />
        </Switch>
    )
}