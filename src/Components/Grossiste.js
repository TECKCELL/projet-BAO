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

      await this.contract1.methods.EnregistrementFacture(idfacture,idPharma,r).send({from:this.account,gas: 470000,
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
        montant : (Math.floor(Math.random()) * (100 - 20) + 20)*(3/100)
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
   <label>{idfacture}</label>
      <br/>
      <label>{montant}</label>
      <br/>
      <label>{idPharma}</label>
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
        montant:''
        
    };
    this.showModal = this.showModal.bind(this);
    this.hideModal = this.hideModal.bind(this);
    this.bao = this.bao.bind(this)
        
    }
    
    render(){
        return(
          
            <div className="subscribe-box">
                    
      Liste des pharmacies
      <ul>
     { this.state.pharmas.map((pharma,index) =>(
    <label>
      <li key={index} data-index={index} onClick={ this.showModal } value={pharma.nom}>{pharma.nom},{pharma.adresse}</li>
      </label>       
                )
    )}</ul>
    <Modal
          isOpen={this.state.show}
          handleClose={this.hideModal}
          style={customStyles}
          onRequestClose={this.hideModal}
          contentLabel="Example Modal"
        >

          <h2>Hello</h2>
          <button>close</button>
          <div>I am a modal</div>
          <form onSubmit={this.bao}>
          
          <this.NumberList 
           idfacture =  {this.state.idfacture}
           montant = {this.state.montant}
           idPharma = {this.state.keyPharma}
              
         />
          
          </form>
        </Modal>



      </div>
      
        );}    
}

export default Grossiste;
const container = document.createElement("main");
document.body.appendChild(container);
//ReactDOM.render(<Grossiste />, container)

