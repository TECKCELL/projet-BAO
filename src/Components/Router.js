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
          <nav class="navbar navbar-expand-lg navbar-dark bg-dark">
            <div class="container-fluid">
              <div class="navbar-header">
                <a class="navbar-brand">BAO Market</a>
              </div>
              <ul class="navbar-nav mr-auto mt-2 mt-lg-0">
                <li class="nav-item active">
                  <a class="nav-link" href="/Router">Acceuil</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/inscription">Pharmacie</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/Grossiste">Administrateur</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="/marketPlace">Central d'achat</a>
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
