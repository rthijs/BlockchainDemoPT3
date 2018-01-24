pragma solidity ^0.4.18; // solhint-disable-line compiler-fixed


contract Router {

    function getManufacturerDirectoryAddress() public constant returns (address);
}


contract ManufacturerDirectory {

    function isManufacturer(address _address) public constant returns (bool);
}


contract CarToken {

    address private owner;
    address private routerContractAddress;

    struct Token {
        uint8 color;
        uint8 wheels;
        uint32 serialNumber;
        address manufacturer;
    }

    Token[] private tokens; //all tokens in existence

    mapping (uint256 => address) public tokenIndexToOwner;
    mapping (address => uint256[]) private addressToTokenIndex;

    event TokenCreated(uint256 _tokenId, address _manufacturer, uint32 serialNumber);

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    modifier onlyManufacturer {
        Router routerContract = Router(routerContractAddress);
        address manufacturerDirectoryAddress = routerContract.getManufacturerDirectoryAddress();
        ManufacturerDirectory manufacturerDirectoryContract = ManufacturerDirectory(manufacturerDirectoryAddress);
        require(manufacturerDirectoryContract.isManufacturer(msg.sender));
        _;
    }

    function CarToken() public {
        owner = msg.sender;
    }

    function setRouterContractAddress(address _newAddress) public onlyOwner {
        routerContractAddress = _newAddress;
    }

    function getRouterContractAddress() public constant returns(address) {
        return routerContractAddress;
    }

    function createToken( uint8 _color, uint8 _wheels, uint32 _serialNumber, address _client)
    public onlyManufacturer returns (uint) {

        Token memory _token = Token({
            color: _color,
            wheels: _wheels,
            serialNumber: _serialNumber,
            manufacturer: msg.sender
        });

        uint newTokenId = tokens.push(_token) - 1;

        tokenIndexToOwner[newTokenId] = _client;
        addressToTokenIndex[_client].push(newTokenId);

        TokenCreated(newTokenId, msg.sender, _serialNumber);

        return newTokenId;
    }

    function getTokensForOwner(address _owner) public onlyOwner constant returns (uint[]) {
        return addressToTokenIndex[_owner];
    }

    function getTokenInfo(uint _tokenId) public onlyOwner constant returns (uint8, uint8, uint32, address) {
        return (tokens[_tokenId].color,
                tokens[_tokenId].wheels,
                tokens[_tokenId].serialNumber,
                tokens[_tokenId].manufacturer);
    }
}
