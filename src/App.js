import 'bootstrap/dist/css/bootstrap.min.css';
import Web3 from 'web3';
import React, { Component } from 'react';
import './App.css';
import Inscription from './Components/Inscriptions';
import Grossiste from './Components/Grossiste';
import Contract from './Components/Contrat';
import Router from './Components/Router';
import Header from './Components/header';
import MarketPlace from './Components/marketPlace';
import Contacts from './Components/Contacts';

class App extends Component {

  constructor(props) {
    super(props)
    this.state = { contract: '' }
  }

  async componentDidMount() {

    let contract = new Contract();
    await contract.init();//charge les methodes en interne (web3js + networkId + MarketPlace )
    this.setState({ contract : contract});
  }


  render() {
    return (
      <div className="App">
        <React.Fragment>
        <div>
          <main>
            <Header />
          </main>
        </div>
        </React.Fragment>

        <Router
          routeComponents={[

            {'path': '/inscription','component': <Inscription contract={this.state.contract} />},
            {'path': '/Grossiste','component': <Grossiste contract={this.state.contract} />},
            {'path': '/marketPlace','component': <MarketPlace contract={this.state.contract} />},
            {'path': '/contacts','component': <Contacts contract={this.state.contract} />}



          ]}
        />
        </div>
    );
        }

}

export default App;
