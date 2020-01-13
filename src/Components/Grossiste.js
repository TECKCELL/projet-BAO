import React, { Component } from 'react';
import Contract from './Contrat';


//import '../css/.css';



class Grossiste extends Component{
   

    componentDidMount(){

         this.loadBlockchainData();


    }
     

/*  async componentDidUpdate() {
       
       
        
    }
    async componentWillUpdate(){
       

    }*/
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
    constructor(props) {
        super(props);
        this.state = {contract : '',
        pharmaCount :0,
        pharmas : []
    };
        
    }
    
    render(){
        return(

            <div className="subscribe-box">
                    
      Listes des pharmacies
      { <ul id="pharmacies">
        {this.state.pharmas.map((pharma,key)=>{

          return(<div>
            <div   key={key}/>
          <label>
            <span>{pharma.nom}</span>
          </label>
          </div>)
        })}
      </ul> }
      </div>
      
      


        );}
    

    
}
export default Grossiste;

