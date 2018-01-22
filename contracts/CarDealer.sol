pragma solidity ^0.4.19; // solhint-disable-line compiler-fixed


contract CarFactory {
    function buildCar(uint8 _colorCode, uint8 _wheelCount, address _clientAddress) public;
}


contract CarDealer {

    address private owner;
    address private factoryAddress;

    struct Car {
        uint8 colorCode;
        uint8 wheelCount;
        address clientAddress;
    }

    mapping (address => Car) private cars;

    function CarDealer() public payable {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    event FactoryAddressChanged(address _old, address _new);
    event OrderRecieved(uint8 _colorCode, uint8 _wheelCount, address _clientAddress);
    event CarReady(address _clientAddress);

    function setFactoryAddress(address _address) public onlyOwner {
        address oldAddress = factoryAddress;
        address newAddress = _address;
        factoryAddress = newAddress;
        FactoryAddressChanged(oldAddress, newAddress);
    }

    function getFactoryAddress() public constant returns (address) {
        return factoryAddress;
    }

    function orderCar(uint8 _colorCode, uint8 _wheelCount) public payable {
        cars[msg.sender] = Car(_colorCode, _wheelCount, msg.sender);
        OrderRecieved(_colorCode, _wheelCount, msg.sender);

        // call the factory to start the manufacturing process
        CarFactory factory = CarFactory(factoryAddress);
        factory.buildCar(_colorCode, _wheelCount, msg.sender);
    }

    function alertCarReady(address _clientAddress) public {
        CarReady(_clientAddress);
    }

    function getContractEtherBalance() public constant returns (uint) {
        return this.balance;
    }

    function withdraw() public onlyOwner returns (bool) {
        if (msg.sender.send(this.balance)) {
            return true;
        } else {
            return false;
        }
    }
}
