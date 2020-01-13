import Web3 from 'web3';
import { HEALTH_ERC20_ABI, HEALTH_ERC20_ADDRESS } from '../config'


class Contract {

    constructor() {
        this.account = '';
        this.accounts2 = '';
        this.accounts3 = '';
        this.contract = '';
        this.contractPharmacie ='';
        this.contractMarketPlace = '';
        this.raft1Node = '';
        this.raft2Node = '';
        this.raft3Node = '';
        this.code = '';

    }

    
    async init() {

        this.raft1Node = new Web3( new Web3.providers.HttpProvider("http://localhost:22000"));
        const accounts = await this.raft1Node.eth.getAccounts()
        this.account =accounts[0];
          console.log(this.account)          
       // unlockAccount(raft1Node);
        this.raft2Node = new Web3( new Web3.providers.HttpProvider("http://localhost:22001"));
        const accounts2 = await this.raft2Node.eth.getAccounts();
        this.accounts2 = accounts2[0];
        //unlockAccount(raft2Node);
        this.raft3Node = new Web3( new Web3.providers.HttpProvider("http://localhost:22002"));
        const accounts3 = await this.raft3Node.eth.getAccounts();
        this.accounts3 = accounts3[0];
       // unlockAccount(raft3Node); 
                         
        const networkId =  await this.raft1Node.eth.net.getId()
               
        if(!this.account){
            window.alert('Set account please');
        }
        else if(!networkId) {
            window.alert('Cannot reach health contract, check network id:',networkId)
        }else if(networkId && this.account) {
            this.contract = await new this.raft1Node.eth.Contract(HEALTH_ERC20_ABI, HEALTH_ERC20_ADDRESS)
            this.contractPharmacie = await new this.raft2Node.eth.Contract(HEALTH_ERC20_ABI, HEALTH_ERC20_ADDRESS)
            this.contractMarketPlace = await new this.raft3Node.eth.Contract(HEALTH_ERC20_ABI, HEALTH_ERC20_ADDRESS)

        }

    }

    async privateForMethodes (methodeName, val, args,key) {
        return await args === undefined ? this.contract.methods[methodeName]().send({'from' : this.raft1Node, 'value' : val,privateFor:[key]})
                : this.contract.methods[methodeName].apply(null, args).send({'from' : this.raft1Node, 'value' : val,privateFor:[key]})
    }

    async publicMethodes (methodeName, args) {
        return await args === undefined ? this.contractPharmacie.methods[methodeName]().send({'from' : this.accounts2,'to':this.contract._address})
                : this.contractPharmacie.methods[methodeName].apply(null, args).send({'from' : this.accounts2,'to':this.contract._address}).then(receipt=> {console.log(receipt)});
    }

    async callMethodes (methodeName, args) {
        return await args === undefined ? this.contract.methods[methodeName]().call({'from' : this.account})
                 : this.contractPharmacie.methods[methodeName].apply(null, [args]).call({'from' : this.account})
    }

}

export default Contract;

