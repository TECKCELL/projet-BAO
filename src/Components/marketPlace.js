import React, { Component } from 'react';
import Contract from './Contrat';
import Web3 from 'web3';
import { HEALTH_ERC20_ABI, HEALTH_ERC20_ADDRESS } from '../config'
const quorumjs = require("quorum-js");

class MarketPlace extends Component{

constructor(props){
        super(props);
        this.state = {

            contract : '',
            montant:0,
            event:''
        
    };
    
        
    }

 async componentDidMount(){
      
              await this.loadBlockchainData();
        }
    

    async loadBlockchainData(){
        let contract = new Contract();
        await contract.init();//charge les methodes en interne (web3js + networkId + MarketPlace )
        /*this.setState({ contract : contract});
        const {contract}  = this.props;*/
        if(!this.state.contract){
            this.setState({ contract :  contract }) 
            //this.raft1Node = new Web3( new Web3.providers.HttpProvider("http://localhost:22002"));
        //quorumjs.extend(this.raft1Node)
        /*const accounts = await this.raft1Node.eth.getAccounts()
        this.account =accounts[0];
        this.contract1 = await new this.raft1Node.eth.Contract(HEALTH_ERC20_ABI, HEALTH_ERC20_ADDRESS)*/
        
        const montantRecupere = await this.state.contract.contractMarketPlace.methods.balanceOf(this.state.contract.accounts3).call();//this.contract1.methods.balanceOf(this.account).call();
        //const montant = await this.state.contract.callMethodesMarketPlace('balanceOf',[this.state.contract.accounts3])
        this.setState({ montant :  montantRecupere }) 
        
        }
      /*  var event = this.state.contract.contractMarketPlace.events.Transfer();

        event.watch(function(error, result){
            // result contains non-indexed arguments and topics
            // given to the `Deposit` call.
            if (!error)
                console.log(result);
        });
        
    this.state.contract.contractMarketPlace.events.Transfer({
   
   filter: { _to: "0xd95d04220342a277f1fddc277e18dc02bc32bdaa" } }
)
    .on("data", function(event) {
                                 let data = event.returnValues
  
                                   console.log(data.from, data.to);
                                })*/
    }                           
    render(){
        return(
          
            <div className="subscribe-box">
                <div>{<label>vous avez recu: {this.state.montant} Bao</label>}</div>
                <div id="txStatus"></div>
            </div>
                );}
                
    }       
export default MarketPlace;