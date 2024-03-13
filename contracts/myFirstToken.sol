//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol"; //Allows Console logging 

contract Token {
	string public name ; //= "My First Token"; 	// MyToken
	string public symbol ; //= "HOODc"; 		//Symbol
	uint256 public decimals = 18;			//Decimal
	uint256 public totalSupply ; //= 1000000 * (10** decimals);

	//part 2- Track Balances 
	//and Send Tokens
	
	//Track Balances
	mapping(address => uint256) public balanceOf;



	constructor(string memory _name, string memory _symbol, uint256 _totalSupply) {
		name = _name;
		symbol = _symbol;
		totalSupply = _totalSupply * (10** decimals);
		balanceOf[msg.sender] = totalSupply;

	}

}


