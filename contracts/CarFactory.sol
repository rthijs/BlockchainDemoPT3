pragma solidity ^0.4.18; // solhint-disable-line compiler-fixed


contract Dealer {

    function alertCarReady(address _clientAddress) public constant;
}


contract CarToken {

    function requestToken(address _clientAddress) public returns (uint);
}


contract Router {

    function getTokenContractAddress() public constant returns (address);
}


contract CarFactory {

    address private owner;
    address private dealer;
    address private router;

    function CarFactory() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    modifier onlyDealer {
        require(msg.sender == dealer);
        _;
    }

    event LogMessage(string _message);
    event BuildOrderRecieved(uint8 _colorCode, uint8 _wheelCount, address _clientAddress);

    function setRouterAddress(address _address) public onlyOwner {
        router = _address;
    }

    function getRouterAddress() public constant returns (address) {
        return router;
    }

    function setDealerAddress(address _address) public onlyOwner {
        dealer = _address;
        LogMessage("Dealer address set.");
    }

    function getDealerAddress() public constant returns (address) {
        return dealer;
    }

    function buildCar(uint8 _colorCode, uint8 _wheelCount, address _clientAddress) public onlyDealer {
        BuildOrderRecieved(_colorCode, _wheelCount, _clientAddress);
    }

    function carIsReady(address _clientAddress) public constant onlyOwner {
        Dealer dealerContract = Dealer(dealer);
        dealerContract.alertCarReady(_clientAddress);
    }

    function requestToken(address _clientAddress) private returns (uint) {
        Router routerContract = Router(router);
        address carTokenContractAddress = routerContract.getTokenContractAddress();
        CarToken token = CarToken(carTokenContractAddress);
        uint tokenId = token.requestToken(_clientAddress);
        return tokenId;
    }
}
