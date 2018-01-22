  var RouterContract = web3.eth.contract([
	{
		"constant": true,
		"inputs": [],
		"name": "getTokenContractAddress",
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
		"name": "getManufacturerDirectoryAddress",
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
		"name": "getOwner",
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
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "setManufacturerDirectoryAddress",
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
		"name": "setTokenContractAddress",
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
		"name": "TokenContractAddressChanged",
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
		"name": "ManufacturerDirectoryAddressChanged",
		"type": "event"
	}
]);

var Router = RouterContract.at(routerContractAddress);

var tokenContractAddressChangedEvent = Router.TokenContractAddressChanged();
var manufacturerDirectoryAddressChanged = Router.ManufacturerDirectoryAddressChanged();

tokenContractAddressChangedEvent.watch(function(error, result) {
  if(!error) {
    showVoertuigTokenAddress();
  } else {
    console.log(error);
  }
});

manufacturerDirectoryAddressChanged.watch(function(error, result) {
  if(!error) {
    showFabrikantDirectoryAddress();
  } else {
    console.log(error);
  }
});


//
// page specific functionality
//
function updateVSCAddress(newAddress, errorBox) {
  var contractAddress = Router.getOwner();
  var currentAddress = web3.eth.defaultAccount;

  if (contractAddress == currentAddress) {
    errorBox.hide();
    Router.setTokenContractAddress(newAddress, {from: currentAddress, gas: 40000});
  } else {
    errorBox.html("De huidige wallet " + currentAddress + " is niet de eigenaar van het router contract " + contractAddress + ".");
    errorBox.show();
  }
}

function updateGFAddress(newAddress, errorBox) {
  console.log("in updateGFAAddress");
  var contractAddress = Router.getOwner();
  var currentAddress = web3.eth.defaultAccount;

  if (contractAddress == currentAddress) {
    errorBox.hide();
    Router.setManufacturerDirectoryAddress(newAddress, {from: currentAddress, gas: 40000});
  } else {
    errorBox.html("De huidige wallet " + currentAddress + " is niet de eigenaar van het router contract " + contractAddress + ".");
    errorBox.show();
  }
}
