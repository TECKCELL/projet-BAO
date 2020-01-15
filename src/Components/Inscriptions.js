import React, { Component } from 'react';
import Web3 from 'web3';
import { HEALTH_ERC20_ABI, HEALTH_ERC20_ADDRESS } from '../config'
const quorumjs = require("quorum-js");

//import '../css/.css';



class Inscription extends Component{
    constructor(props) {
        super(props);
        this.state = {contract : ''};
        this.raft1Node = '';
        this.contract1 = '';
    }


    async componentDidUpdate() {
       // let Contract = new Contract();
        //await Contract.init();
        const {contract}  = this.props;
        if(!this.state.contract){
            this.setState({ contract :  contract })
        }
    }
    async Inscription(username,addresse){

        this.raft1Node = new Web3( new Web3.providers.HttpProvider("http://localhost:22000"));
        quorumjs.extend(this.raft1Node)
        const accounts = await this.raft1Node.eth.getAccounts()
        this.account =accounts[0];
        this.contract1 = await new this.raft1Node.eth.Contract(HEALTH_ERC20_ABI, HEALTH_ERC20_ADDRESS)

        await this.contract1.methods.EnregistrementpharmacieAddress(username,addresse).send({from:this.account,gas: 470000,
            gasPrice:0,}).then(receipt=> {console.log(receipt)});
    }

    form = () => {
       return (
        <div className="subscribe-box">
            <h2>Inscription à MédiConnect</h2>
            <form onSubmit={ this.save} className="subscribe">
            <input id="nom" ref={(input) => { this.nom = input }} type="text" placeholder="Veuillez entrer votre nom d'utilisateur" onChange={this.changeUsername} minLength="3" autoComplete="off"        required="required"/>
            <input id ="addresse" ref={(input) => { this.addresse = input }} type="text" placeholder="Veuillez entrer addresse"minLength="3" autoComplete="off" required="required"/>
            <button type="submit"> <span>S'inscrire</span></button>
            </form>
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

