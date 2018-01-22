var ManufacturerDirectoryContract = web3.eth.contract([
	{
		"constant": true,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			}
		],
		"name": "isManufacturer",
		"outputs": [
			{
				"name": "",
				"type": "bool"
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
		"name": "registerManufacturer",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function"
	},
	{
		"constant": true,
		"inputs": [],
		"name": "getManufacturers",
		"outputs": [
			{
				"name": "",
				"type": "address[]"
			}
		],
		"payable": false,
		"stateMutability": "view",
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
				"name": "_address",
				"type": "address"
			}
		],
		"name": "ManufacturerAdded",
		"type": "event"
	}
]);

var ManufacturerDirectory = ManufacturerDirectoryContract.at(manufacturerDirectoryContractAddress);

var manufacturerAddedEvent = ManufacturerDirectory.ManufacturerAdded();

manufacturerAddedEvent.watch(function(error, result) {
		if(!error) {
			console.log(result.args._message);
		} else {
			console.log(error);
		}
});
