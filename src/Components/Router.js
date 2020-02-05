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
         
          <Switch>
           {this.routes()}
          </Switch>
        </BrowserRouter>
      </div>
    )
  }
}
export default Router
