pragma solidity ^0.4.17;

/**
 * @title Ownable
 * @dev The Ownable contract has an owner address, and provides basic authorization control
 * functions, this simplifies the implementation of "user permissions".
 */
contract Ownable {
  // state variables
  address   admin;
  

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
  
  function transferOwnership(address  newOwner) public onlyOwner {
    require(newOwner != address(0));
    emit OwnershipTransferred(admin, newOwner);
    admin = newOwner;
  }
}