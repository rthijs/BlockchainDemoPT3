pragma solidity ^0.4.18; // solhint-disable-line compiler-fixed


contract ManufacturerDirectory {

    address private owner;
    address[] private registeredManufacturers;

    mapping (address => uint) private manufacturers;

    event ManufacturerAdded(address _address);

    // constructor
    function ManufacturerDirectory() public {
        owner = msg.sender;
    }

    // modififiers
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function registerManufacturer(address _address) public onlyOwner {
        uint index = registeredManufacturers.push(_address); //starts at 1?
        manufacturers[_address] = index;
        ManufacturerAdded(_address);
    }

    function isManufacturer(address _address) public constant returns (bool) {
        return manufacturers[_address] != 0;
    }

    function getManufacturers() public constant returns (address[]) {
        return registeredManufacturers;
    }

}
