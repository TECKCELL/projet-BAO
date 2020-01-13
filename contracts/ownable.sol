pragma solidity 0.5.12;

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
  // state variables
  address  payable admin;
  

  event OwnershipTransferred(address indexed previousOwner, address indexed newOwner);


  // modifiers
  modifier onlyOwner() {
    require(msg.sender == admin);
    _;
  }

  // constructor
  constructor() public {
    admin = msg.sender;
  }
  
  function transferOwnership(address payable newOwner) public onlyOwner {
    require(newOwner != address(0));
    emit OwnershipTransferred(admin, newOwner);
    admin = newOwner;
  }
}
