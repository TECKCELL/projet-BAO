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

        this.raft1Node = new Web3( new Web3.providers.HttpProvider("http://localhost:22001"));
        quorumjs.extend(this.raft1Node)
        const accounts = await this.raft1Node.eth.getAccounts()
        this.account =accounts[0];
        this.contract1 = await new this.raft1Node.eth.Contract(HEALTH_ERC20_ABI, HEALTH_ERC20_ADDRESS)

        await this.state.contract.contractPharmacie.methods.EnregistrementpharmacieAddress(username,addresse).send({from:this.account,gas: 470000,
            gasPrice:0,}).then(receipt=> {alert(JSON.stringify(receipt,null,'\t'))});
    }
    async EnvoyerBao(){

        this.raft1Node = new Web3( new Web3.providers.HttpProvider("http://localhost:22001"));
        quorumjs.extend(this.raft1Node)
        const accounts = await this.raft1Node.eth.getAccounts()
        this.account =accounts[0];
        this.contract1 = await new this.raft1Node.eth.Contract(HEALTH_ERC20_ABI, HEALTH_ERC20_ADDRESS)
        let montant = this.state.balanceDao;
        await this.state.contract.contractPharmacie.methods.transfer(this.state.contract.accounts3,montant).send({from:this.account,gas: 470000,
            gasPrice:0}).then(receipt=> {alert(JSON.stringify(receipt,null,'\t'))});

    }

    form = () => {
       return (
<div className="site-section">
    <div className="container">
      <div className="row">
        <div className="col-md-12">
          <h2 className="h3 mb-5 text-black">Inscription</h2>
        </div>
        <div className="col-md-12">
  
          <form onSubmit={ this.save}>
  
            <div className="p-3 p-lg-5 border">
              <div className="form-group row">
                <div className="col-md-6">
                  <label for="usr" className="text-black">Veuillez entrer le nom de votre pharmacie<span className="text-danger">*</span></label>
                  <input id="usr" className="form-control" ref={(input) => { this.usr = input }} type="text" placeholder="Veuillez entrer le nom de votre pharmacie" onChange={this.changeUsername} minLength="3" autoComplete="off"        required="required"/>
                </div>
                <div className="col-md-6">
                  <label for="usr" className="text-black">Veuillez entrer une adresse <span className="text-danger">*</span></label>
                  <input id ="addresse"
            ref={(input) => { this.addresse = input }}
             type="text"
             class="form-control"
              placeholder="Veuillez entrer addresse"
              minLength="3"
              autoComplete="off"
              required="required"/>
                </div>
                <div className="col-md-12" >
                    <br></br>
                </div>
              <div className="form-group row">
                <div className="col-lg-12">
                  <input type="submit" className="btn btn-success btn-lg btn-block" value="S'inscrire"/>
                </div>

              </div>
              
            </div>
            </div>
          </form>
          </div>
          <br/>
          <div className="col-md-12">
          <div className="p-3 p-lg-5 border" >{<label>vous possedez: {this.state.balanceDao} <span style={{color: "green"}}>BAO(s)</span></label>}
          <span></span>
   
          {<button className="btn btn-success btn-lg btn-block" onClick={ this.EnvoyerBao }>Envoyer BAO</button>}
   <div className="col-md-12">
       <br></br>
   </div>

          <ul>
        { this.state.codes.map((code,index) =>(
       
         <li key={index} data-index={index}>Code de réduction:{code.code},Montant:{code.montant}<br></br></li>
         
                   )
       )}</ul>
        
    
  </div>
     </div>
         </div>
        
      
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
        const username = this.usr.value;
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
