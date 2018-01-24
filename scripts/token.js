var TokenContract = web3.eth.contract([
	{
		"constant": true,
		"inputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"name": "tokenIndexToOwner",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_owner",
				"type": "address"
			}
		],
		"name": "getTokensForOwner",
		"outputs": [
			{
				"name": "",
				"type": "uint256[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [
			{
				"name": "_tokenId",
				"type": "uint256"
			}
		],
		"name": "getTokenInfo",
		"outputs": [
			{
				"name": "",
				"type": "uint8"
			},
			{
				"name": "",
				"type": "uint8"
			},
			{
				"name": "",
				"type": "uint32"
			},
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getRouterContractAddress",
		"outputs": [
			{
				"name": "",
				"type": "address"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_tokenId",
				"type": "uint256"
			},
			{
				"indexed": false,
				"name": "_manufacturer",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "serialNumber",
				"type": "uint32"
			}
		],
		"name": "TokenCreated",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_color",
				"type": "uint8"
			},
			{
				"name": "_wheels",
				"type": "uint8"
			},
			{
				"name": "_serialNumber",
				"type": "uint32"
			},
			{
				"name": "_client",
				"type": "address"
			}
		],
		"name": "createToken",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_newAddress",
				"type": "address"
			}
		],
		"name": "setRouterContractAddress",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor"
	}
]);

var Token = TokenContract.at(tokenContractAddress);

var tokenCreatedEvent = Token.TokenCreated();

tokenCreatedEvent.watch(function(error, result) {
  if(!error) {
    console.log("tokenCreatedEvent");
    console.log(result);
    console.log("tokenId :" + result.args._tokenId);
    console.log("manufacturer :" + result.args._manufacturer);
    console.log("serialNumber :" + result.args.serialNumber);
    handleTokenCreatedEvent(result.args._tokenId, result.args._manufacturer, result.args.serialNumber);
  } else {
    console.log(error);
  }
});

function getTokenInfo(_tokenId) {
  return Token.getTokenInfo(_tokenId);
}

function getTokensForOwner(_address) {
  return Token.getTokensForOwner(_address);
}

function tokenIndexToOwner(_tokenId) {
  return Token.tokenIndexToOwner(_tokenId);
}


//
// page specific functionality
//
