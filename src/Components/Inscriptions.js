import React, { Component } from 'react';

//import '../css/.css';



class Inscription extends Component{
    constructor(props) {
        super(props);
        this.state = {contract : ''};
    }


    async componentDidUpdate() {
       // let Contract = new Contract();
        //await Contract.init();
        const {contract}  = this.props;
        if(!this.state.contract){
            this.setState({ contract :  contract })
        }
    }

    form = () => {
       return (
        <div className="subscribe-box">
            <h2>Inscription à MédiConnect</h2>
            <form onSubmit={this.save} className="subscribe">
            <input id="nom" ref={(input) => { this.nom = input }} type="text" placeholder="Veuillez entrer votre nom d'utilisateur" onChange={this.changeUsername} minLength="3" autoComplete="off"        required="required"/>
            <input id ="addresse" ref={(input) => { this.addresse = input }} type="text" placeholder="Veuillez entrer addresse"minLength="3" autoComplete="off" required="required"/>
            <button type="submit"> <span>S'inscrire'</span></button>
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
        this.state.contract.publicMethodes('EnregistrementpharmacieAddress',[username,addresse])
       
    }
    render(){
        return this.form();
    }
}
export default Inscription;

