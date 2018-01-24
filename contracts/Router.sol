pragma solidity ^0.4.18; // solhint-disable-line compiler-fixed


contract Router {
    function getOwner() public constant returns (address);

    // Car Token contract
    // register vehicles
    function getTokenContractAddress() public constant returns (address);
    function setTokenContractAddress(address _address) public;

    // Registered Manufacturers are stored in the ManufacturerDirectory
    function getManufacturerDirectoryAddress() public constant returns (address);
    function setManufacturerDirectoryAddress(address _address) public;

    // Events
    event TokenContractAddressChanged(address _old, address _new);
    event ManufacturerDirectoryAddressChanged(address _old, address _new);
}


contract CarRouter is Router {

    address private owner;
    address private tokenContractAddress = 0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa;
    address private manufacturerDirectoryAddress = 0xaAaAaAaaAaAaAaaAaAAAAAAAAaaaAaAaAaaAaaAa;

    // constructor
    function CarRouter() public {
        owner = msg.sender;
    }

    // modififiers
    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    //
    // Router specific functions
    //
    function getOwner() public constant returns (address) {
        return owner;
    }

    //
    // Cointinuum Token functions
    //
    function getTokenContractAddress() public constant returns (address) {
        return tokenContractAddress;
    }

    function setTokenContractAddress(address _address) public onlyOwner {
        address oldAddress = tokenContractAddress;
        address newAddress = _address;
        tokenContractAddress = newAddress;
        TokenContractAddressChanged(oldAddress, newAddress);
    }

    //
    // Registered Manufacturers
    //
    function getManufacturerDirectoryAddress() public constant returns (address) {
        return manufacturerDirectoryAddress;
    }

    function setManufacturerDirectoryAddress(address _address) public {
        address oldAddress = manufacturerDirectoryAddress;
        address newAddress = _address;
        manufacturerDirectoryAddress = newAddress;
        ManufacturerDirectoryAddressChanged(oldAddress, newAddress);
    }

}
