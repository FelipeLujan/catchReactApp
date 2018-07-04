import React from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import StorepickerComponent from "./Storepicker.Component";
import AppComponent from "./App.Component";
import NotFoundComponent from "./NorFoundComponent";

const RouterComponent = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={StorepickerComponent} />
      <Route path="/store/:storeId" component={AppComponent} />
      <Route component={NotFoundComponent} />
    </Switch>
  </BrowserRouter>
);

export default RouterComponent;
