pragma solidity 0.5.12;

import "./ownable.sol";
import "./ERC20.sol";
import "./safeMath.sol";
import "./SafeERC20.sol";
import "./ReentrancyGuard.sol";


contract healthERC20 is  Ownable,ReentrancyGuard,ERC20 {
    using safeMath for uint256;
    using SafeERC20 for ERC20;
    
    struct pharmacie{
        string nom;
        string adresse;
    }

    ERC20 private _token;
    uint256 private _rate;
    mapping(address => uint256 )FacturePharmacie;
    mapping (address => pharmacie )PhamarcieProprietaire;
    mapping(uint256 => address)PhamarcieIdentifiant;
    mapping (uint256 => uint)FactureUtlisee;
    pharmacie[] Pharmacies;
    uint256[] ListeDesFactures;

    constructor (uint256 rate, ERC20 token) public {
        require(rate > 0, " rate is 0");
        require(address(token) != address(0), " token is the zero address");

        _rate = rate;
        _token = token;
    }
    
    function EnregistrementpharmacieAddress(string memory _nom ,string memory  _addresse) public{
        pharmacie memory p;
        p.nom = _nom;
        p.adresse = _addresse;
        require(keccak256(abi.encodePacked(PhamarcieProprietaire[msg.sender].adresse)) != keccak256(abi.encodePacked(p.adresse)),"vous etes déja inscrit");
        uint id = Pharmacies.push(p);
        PhamarcieIdentifiant[id] = msg.sender;
        PhamarcieProprietaire[msg.sender] = p ;
    }
    
    function EnregistrementFacture(uint _identifiantFacture,uint _identifiantPharmacie,uint256 montant)public onlyOwner {
       address adressePharmacie = PhamarcieIdentifiant[_identifiantPharmacie];
       require(FacturePharmacie[adressePharmacie] != _identifiantFacture,"Cette facture à déja été enregistrée");
       uint identifiant = ListeDesFactures.push(_identifiantFacture);
       FacturePharmacie[adressePharmacie] = identifiant;
       generateTokens(adressePharmacie,montant);
       
    }
    function ListedePharmacies()external view returns (uint[]memory){
        uint[] memory results = new uint[](Pharmacies.length);
        uint counter;
        for(uint i= 0;i <= Pharmacies.length;i++ ){
            results[counter]= i;
            counter++;
        }
        return results;
    }
   

    /*function () external payable {
        buyTokens(msg.sender);
    }*/

    /**
     */
    function token() public view returns (ERC20) {
        return _token;
    }

    /**
     * @return the number of token units a buyer gets per wei.
     */
    function rate() public view returns (uint256) {
        return _rate;
    }

    /**
     * @return the amount of wei raised.
     */
   

    /**
    
     */
    function generateTokens(address beneficiary,uint256 _montant) internal nonReentrant onlyOwner {
        uint256 weiAmount = _montant;
        _preValidatePurchase(beneficiary, weiAmount);

        // calculate token amount to be created
        uint256 tokens = _getTokenAmount(weiAmount);
        _processPurchase(beneficiary, tokens);
       
    }
    

    /**
     
     */
    function _preValidatePurchase(address beneficiary, uint256 weiAmount) internal view {
        require(beneficiary != address(0), "beneficiary is the zero address");
        require(weiAmount != 0, " weiAmount is 0");
        this; 
    }

    /**
     
     */
    function _deliverTokens(address beneficiary, uint256 tokenAmount) internal {
        _token.safeTransfer(beneficiary, tokenAmount);
    }

    /**
    
     */
     function buyTokens(address from, address to, uint256 tokenAmount)internal nonReentrant onlyOwner{
        _token.safeTransferFrom(from,to, tokenAmount);
    }
    function _processPurchase(address beneficiary, uint256 tokenAmount) internal {
        _deliverTokens(beneficiary, tokenAmount);
    } 
    /**s
    
     */
    function _getTokenAmount(uint256 weiAmount) internal view returns (uint256) {
        return weiAmount.mul(_rate);
    } 
}
