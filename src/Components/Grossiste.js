import React, { Component } from 'react';
import Contract from './Contrat';
import Modal from 'react-modal';
import ReactDOM from 'react-dom';
import Web3 from 'web3';
import { HEALTH_ERC20_ABI, HEALTH_ERC20_ADDRESS } from '../config'
const quorumjs = require("quorum-js");

const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};





//import '../css/.css';


class Grossiste extends Component{


 componentWillUpdate(){
  Modal.setAppElement('main');
 }
    componentDidMount(){

         this.loadBlockchainData();
    }

    async loadBlockchainData(){

        let contract = new Contract();
        await contract.init();//charge les methodes en interne (web3js + networkId + MarketPlace )
        /*this.setState({ contract : contract});
        const {contract}  = this.props;*/
        if(!this.state.contract){
            this.setState({ contract :  contract })

        const pharmaCount = await this.state.contract.callMethodes('ListedePharmacies')
        this.setState({ pharmaCount })
        for (var i = 0; i <= pharmaCount.length -1; i++) {

            const pharma = await this.state.contract.callMethodes('Pharmacies',[i])
            this.setState({
              pharmas: [...this.state.pharmas, pharma]

            })
          }

          const balanceGrossiste = await this.state.contract.contract.methods.balanceOf(this.state.contract.account).call();
          this.setState({ montantBAO :  balanceGrossiste })

        }
    }
    bao = event => {
      if(event === undefined)
          return 1;
      event.preventDefault();
      const idfacture = this.state.idfacture;
      const montant = this.state.montant;
      const idPharma = parseInt(this.state.keyPharma);
     // console.log(this.state)
     this.genererBao(idfacture,montant,idPharma);

      //this.state.contract.publicMethodes('EnregistrementpharmacieAddress',[username,addresse])

  }
    async genererBao(idfacture,montant,idPharma){

      this.raft1Node = new Web3( new Web3.providers.HttpProvider("http://localhost:22000"));
      quorumjs.extend(this.raft1Node)
      const accounts = await this.raft1Node.eth.getAccounts()
      this.account =accounts[0];
      this.contract1 = await new this.raft1Node.eth.Contract(HEALTH_ERC20_ABI, HEALTH_ERC20_ADDRESS)

      let ethEuro = 150.40
      let value = montant/ethEuro
      let r = this.raft1Node.utils.toWei(value.toString() ,'ether');

      await this.state.contract.contract.methods.EnregistrementFacture(idfacture,idPharma,montant).send({from:this.account,gas: 470000,
          gasPrice:0,}).then(receipt=> {console.log(receipt)});
  }
    async retrouverBao(){

      let account3 = this.state.contract.accounts3;
      let account1 = this.state.contract.account;
      const montantRecupere = await this.state.contract.contractMarketPlace.methods.balanceOf(this.state.contract.accounts3).call();

      await this.state.contract.contract.methods.transferFrom(account3,account1,montantRecupere).send({from:account1,gas: 470000,
        gasPrice:0,}).then(receipt=> {console.log(receipt)});



    }
    async brulerBAO(){

      let burnMontant = parseInt(this.state.montantBAO)

      await this.state.contract.contract.methods.burn(burnMontant).send({from:this.state.contract.account,gas: 470000,
        gasPrice:0,}).then(receipt=> {console.log(receipt)});

    }



    showModal = (e) => {
      let objet = this.genererFactureMontant()
      this.setState({ show: true ,keyPharma:e.target.getAttribute("data-index"),idfacture:objet.idfacture,montant:objet.montant});
    };

    hideModal = () => {
      this.setState({ show: false });
    };


    genererFactureMontant = function () {
      let objet = {

        idfacture : Math.floor(Math.random()* (10 - 1) + 1),
        montant : Math.floor(Math.floor(Math.random() * (10000 - 2000) + 20)*(3/100))
      }
     return objet
    }

    NumberList = function(props){
      const idfacture = props.idfacture
      const montant = props.montant
      const idPharma = props.idPharma
     return(
<div>
<form>
   <label>Identifiant facture :{idfacture}</label>
      <br/>
      <label>montant facture :{montant} <span>BAO</span></label>
      <br/>
      <label>Identifiant pharmacie :{idPharma}</label>
      <br/>
      <button type="submit" >Générer BAO</button>
  </form>
      </div>

     )
  }
  //this.genererBao(idfacture,montant,idPharma)

    constructor(props){
        super(props);
        this.state = {contract : '',
        pharmaCount :0,
        pharmas : [],
        keyPharma :'',
        state :{ show: false },
        idfacture :'',
        montant:'',
        montantBAO:0

    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.bao = this.bao.bind(this)
    this.retrouverBao = this.retrouverBao.bind(this)
    this.brulerBAO = this.brulerBAO.bind(this)

    }

    render(){
        return(

            <div className="subscribe-box">

      Liste des pharmacies
      <ul class="list-group">
     { this.state.pharmas.map((pharma,index) =>(
    <label>
      <li class="list-group-item list-group-item-info" key={index} data-index={index} onClick={ this.showModal } value={pharma.nom}>{pharma.nom},{pharma.adresse}</li>
      </label>
                )
    )}</ul>
    <Modal
          isOpen={this.state.show}
          handleClose={this.hideModal}
          style={customStyles}
          onRequestClose={this.hideModal}
          contentLabel=" Modal"
        >

          <h2>Génération BAO</h2>

          <form onSubmit={this.bao}>

          <this.NumberList
           idfacture =  {this.state.idfacture}
           montant = {this.state.montant}
           idPharma = {this.state.keyPharma}

         />

          </form>
        </Modal>

        {<button class="btn btn-secondary" onClick={ this.retrouverBao }>RetrouverBao</button>}
        <br/>
        <div>{<label>vous avez récupérer: {this.state.montantBAO} Bao</label>}</div>
        {<button class="btn btn-secondary" onClick={ this.brulerBAO }>Burn!!</button>}

      </div>

        );}
}

export default Grossiste;
const container = document.createElement("main");
document.body.appendChild(container);
//ReactDOM.render(<Grossiste />, container)
