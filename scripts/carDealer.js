var CarDealerContract = web3.eth.contract([
	{
		"constant": true,
		"inputs": [],
		"name": "getFactoryAddress",
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
		"name": "getContractEtherBalance",
		"outputs": [
			{
				"name": "",
				"type": "uint256"
			}
		],
		"payable": false,
		"stateMutability": "view",
		"type": "function"
	},
	{
		"anonymous": false,
		"inputs": [],
		"name": "CarReady",
		"type": "event"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_old",
				"type": "address"
			},
			{
				"indexed": false,
				"name": "_new",
				"type": "address"
			}
		],
		"name": "FactoryAddressChanged",
		"type": "event"
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
		"name": "OrderRecieved",
		"type": "event"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "alertCarReady",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
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
			}
		],
		"name": "orderCar",
		"outputs": [],
		"payable": true,
		"stateMutability": "payable",
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
		"name": "setFactoryAddress",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "withdraw",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"inputs": [],
		"payable": true,
		"stateMutability": "payable",
		"type": "constructor"
	}
]);

var CarDealer = CarDealerContract.at(carDealerContractAddress);

var factoryAddressChangedEvent = CarDealer.FactoryAddressChanged();
var orderRecievedEvent = CarDealer.OrderRecieved();
var carReadyEvent = CarDealer.CarReady();

factoryAddressChangedEvent.watch(function(error, result) {
  if(!error) {
    console.log("factoryAddressChangedEvent");
    console.log(result);
  } else {
    console.log(error);
  }
});

orderRecievedEvent.watch(function(error, result) {
  if(!error) {
    console.log("orderRecievedEvent");
    console.log(result);
    orderRecieved(result);
  } else {
    console.log(error);
  }
});

carReadyEvent.watch(function(error, result) {
  if(!error) {
    console.log("carReadyEvent");
    console.log(result);
    carReady();
  } else {
    console.log(error);
  }
});


//
// page specific functionality
//
