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
            event:'',
            
        
    };
    this.genererCodedeReduction = this.genererCodedeReduction.bind(this);
        
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
           
        
        const montantRecupere = await this.state.contract.contractMarketPlace.methods.balanceOf(this.state.contract.accounts3).call();
        this.setState({ montant :  montantRecupere }) 
        await this.state.contract.contractMarketPlace.methods.approve(this.state.contract.account,montantRecupere).send({from:this.state.contract.accounts3,gas: 470000,
            gasPrice:0,}).then(receipt=> {console.log(receipt)});



            
        
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
    async genererCodedeReduction(){
        await this.state.contract.contractMarketPlace.methods.GenerationCodeReduction(this.state.contract.accounts2,this.state.montant).send({from:this.state.contract.accounts3,gas: 470000,
            gasPrice:0,}).then(receipt=> {console.log(receipt)});

    }   
    
    
    render(){
        return(
          
            <div className="subscribe-box">
                <div>{<label>vous avez recu: {this.state.montant} Bao</label>}</div>
                {<button onClick={ this.genererCodedeReduction }> <span>Generer code de réduction</span></button>}
                <div id="txStatus"></div>
            </div>
                );}
                
    }       
export default MarketPlace;