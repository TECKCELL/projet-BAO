import React, { Component } from 'react';
import Web3 from 'web3';
import Contract from './Contrat';
import { HEALTH_ERC20_ABI, HEALTH_ERC20_ADDRESS } from '../config'
const quorumjs = require("quorum-js");

//import '../css/.css';



class Inscription extends Component{
    constructor(props) {
        super(props);
        this.state = {contract : '',
        balanceDao :0,
        codeCount :0,
        codes : []   
    };
        this.raft1Node = '';
        this.contract1 = '';
       
        this.EnvoyerBao = this.EnvoyerBao.bind(this)
       
    }

   /* async componentDidUpdate(){
       

        }*/
    async componentDidMount() {
        let contract3 = new Contract();
        await contract3.init();
        const {contract}  = this.props;
        if(!this.state.contract3){
            this.setState({ 
                contract :  contract3 
                
            
            })
             await this.LoadBlockChainData();
        }
       
    }
    async LoadBlockChainData(){

        this.raft1Node = new Web3( new Web3.providers.HttpProvider("http://localhost:22001"));
        quorumjs.extend(this.raft1Node)
        const accounts = await this.raft1Node.eth.getAccounts()
        this.account =accounts[0];
        this.contract1 = await new this.raft1Node.eth.Contract(HEALTH_ERC20_ABI, HEALTH_ERC20_ADDRESS)
        
        const montantRecupere = await this.contract1.methods.balanceOf(this.account).call();
         //await this.state.contract.contractPharmacie.methods.balanceOf(this.account).call();

            this.setState({ balanceDao :  montantRecupere })


        const codeCount = await this.state.contract.callMethodes('ListedeCodes')
        this.setState({ codeCount })
        for (var i = 0; i <= codeCount.length -1; i++) {

            const codes = await this.state.contract.callMethodes('codes',[i])
            this.setState({
                codes: [...this.state.codes, codes]
              
            })
          }

    }
    async Inscription(username,addresse){

        /*this.raft1Node = new Web3( new Web3.providers.HttpProvider("http://localhost:22001"));
        quorumjs.extend(this.raft1Node)
        const accounts = await this.raft1Node.eth.getAccounts()
        this.account =accounts[0];
        this.contract1 = await new this.raft1Node.eth.Contract(HEALTH_ERC20_ABI, HEALTH_ERC20_ADDRESS)*/

        await this.state.contract.contractPharmacie.methods.EnregistrementpharmacieAddress(username,addresse).send({from:this.account,gas: 470000,
            gasPrice:0,}).then(receipt=> {console.log(receipt)});
    }
    async EnvoyerBao(){

        this.raft1Node = new Web3( new Web3.providers.HttpProvider("http://localhost:22001"));
        quorumjs.extend(this.raft1Node)
        const accounts = await this.raft1Node.eth.getAccounts()
        this.account =accounts[0];
        this.contract1 = await new this.raft1Node.eth.Contract(HEALTH_ERC20_ABI, HEALTH_ERC20_ADDRESS)
        let montant = this.state.balanceDao;
        await this.contract1.methods.transfer(this.state.contract.accounts3,montant).send({from:this.account,gas: 470000,
            gasPrice:0,}).then(receipt=> {console.log(receipt)});

    }
    
    form = () => {
       return (
        <div className="subscribe-box">
            <h2>Inscription à MédiConnect</h2>
            <form onSubmit={ this.save} className="subscribe">
            <input id="nom" ref={(input) => { this.nom = input }} type="text" placeholder="Veuillez entrer votre nom d'utilisateur" onChange={this.changeUsername} minLength="3" autoComplete="off"        required="required"/>
            <br/>
            <br/>

            <input id ="addresse" 
            ref={(input) => { this.addresse = input }}
             type="text"
              placeholder="Veuillez entrer addresse"
              minLength="3"
              autoComplete="off" 
              required="required"/>
              <br/>
              <br/>

            <button type="submit"> <span>S'inscrire</span></button>
            </form>
            <br/>
       <div>{<label>vous possedez: {this.state.balanceDao} Bao</label>}
       
       {<button onClick={ this.EnvoyerBao }> <span>EnvoyerBao</span></button>}

       <ul>
     { this.state.codes.map((code,index) =>(
    <label>
      <li key={index} data-index={index}>Code de réduction:{code.code},Montant:{code.montant}</li>
      </label>       
                )
    )}</ul>
       
       </div>
        </div>
       );
    }
    changeUsername = event => {
        this.setState({username : event.target.value});
    }
     save = event => {
        if(event === undefined)
            return 1;
        event.preventDefault();
        const username = this.nom.value;
        const addresse = this.addresse.value;
       // console.log(this.state)
       this.Inscription(username,addresse);
       
        //this.state.contract.publicMethodes('EnregistrementpharmacieAddress',[username,addresse])
       
    }
    render(){
        return this.form();
    }
}
export default Inscription;

