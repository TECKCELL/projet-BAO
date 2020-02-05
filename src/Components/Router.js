import React, { Component } from 'react';
import { BrowserRouter, Switch, Route} from "react-router-dom";
//import '../css/.css';

class Router extends Component {


  routes(){
    let res = []
    let key = 0;
    for(let routeComponent of this.props.routeComponents){
      res.push( <Route key={key} path={routeComponent.path}> {routeComponent.component} </Route> )
      key++
    }
    return res;
  }

  render() {
    return (

      <div>
        <BrowserRouter>
          <nav class="navbar navbar-expand-lg navbar-dark bg-primary">
            <div class="container-fluid">
              <div class="navbar-header">
                <a class="navbar-brand text-success">BAO Market</a>
              </div>
              <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                  <a class="nav-link text-white" href="/Router">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white" href="/inscription">Pharmacies</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white" href="/Grossiste">Administrateur</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link text-white" href="/marketPlace">MarketPlace</a>
                </li>
              </ul>
            </div>
          </nav>
          <Switch>
           {this.routes()}
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default Router
