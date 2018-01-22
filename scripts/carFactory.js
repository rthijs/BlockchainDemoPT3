var CarFactoryContract = web3.eth.contract([
	{
		"constant": true,
		"inputs": [],
		"name": "getRouterAddress",
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
		"inputs": [],
		"name": "getDealerAddress",
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
				"name": "_clientAddress",
				"type": "address"
			}
		],
		"name": "carIsReady",
		"outputs": [],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_colorCode",
				"type": "uint8"
			},
			{
				"indexed": false,
				"name": "_wheelCount",
				"type": "uint8"
			},
			{
				"indexed": false,
				"name": "_clientAddress",
				"type": "address"
			}
		],
		"name": "BuildOrderRecieved",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_message",
				"type": "string"
			}
		],
		"name": "LogMessage",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_colorCode",
				"type": "uint8"
			},
			{
				"name": "_wheelCount",
				"type": "uint8"
			},
			{
				"name": "_clientAddress",
				"type": "address"
			}
		],
		"name": "buildCar",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "setDealerAddress",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "setRouterAddress",
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

var CarFactory = CarFactoryContract.at(carFactoryContractAddress);

var logMessageEvent = CarFactory.LogMessage();
var buildOrderRecievedEvent = CarFactory.BuildOrderRecieved();

logMessageEvent.watch(function(error, result) {
		if(!error) {
			logMessage(result.args._message);
		} else {
			console.log(error);
		}
});

buildOrderRecievedEvent.watch(function(error, result) {
  if(!error) {
    var klant = result.args._clientAddress;
    var kleur = result.args._colorCode.c[0];
    var wielen = result.args._wheelCount.c[0];

    setOrderDetails(klant, kleur, wielen);
  } else {
    console.log(error);
  }
});


//
// page specific functionality
//
