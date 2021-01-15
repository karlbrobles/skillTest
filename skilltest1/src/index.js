import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import RecipeForm from "./components/RecipeForm";
import Recipes from "./components/Recipes";
import RecipeView from "./components/RecipeView";
import "./index.scss";

ReactDOM.render(
    <React.StrictMode>
        <Router>
            <Switch>
                <Route path="/" exact component={Recipes} />
                <Route path="/recipe-view/:slug" component={RecipeView} />
                <Route path="/recipe-form" exact component={RecipeForm} />
                <Route path="/recipe-form/:slug" component={RecipeForm} />
            </Switch>
        </Router>
    </React.StrictMode>,
    document.getElementById("root")
);
