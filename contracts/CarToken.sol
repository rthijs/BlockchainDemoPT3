pragma solidity ^0.4.18; // solhint-disable-line compiler-fixed


// based on the 721 proposal: https://github.com/ethereum/eips/issues/721
// also this: https://medium.com/crypto-currently/the-anatomy-of-erc721-e9db77abfc24
contract ERC721 {
    // ERC20 compatibility
    function name() public constant returns (string tokenName);
    function symbol() public constant returns (string tokenSymbol);
    function totalSupply() public view returns (uint256 total);
    function balanceOf(address _owner) public constant returns (uint balance);
    // basic ownership
    function ownerOf(uint256 _tokenId) public constant returns (address owner);
    function approve(address _to, uint256 _tokenId) public;
    function takeOwnership(uint256 _tokenId) public;
    function transfer(address _to, uint256 _tokenId) public;
    function tokenOfOwnerByIndex(address _owner, uint256 _index) public constant returns (uint tokenId);
    // NFT Metadata
    function tokenMetadata(uint256 _tokenId) public constant returns (string infoUrl);

    // Events
    event TransferEvent(address from, address to, uint256 tokenId);
    event ApprovalEvent(address owner, address approved, uint256 tokenId);
}


contract Cointinuum is ERC721 {

    string private tokenName = "Cointinuum";
    string private tokenSymbol = "XCT";
    address private owner;

    struct ContinuCar {
        uint8 colourCode;
    }

    ContinuCar[] private cars;

    mapping(address => uint) private balances;
    mapping(uint256 => address) private tokenOwners;
    mapping(uint256 => bool) private tokenExists;
    mapping(address => mapping (address => uint256)) private allowed;
    mapping(address => mapping(uint256 => uint256)) private ownerTokens;
    mapping(uint256 => string) private tokenLinks;

    function Cointinuum() public {
        owner = msg.sender;
    }

    modifier onlyOwner {
        require(msg.sender == owner);
        _;
    }

    function name() public constant returns (string) {
        return tokenName;
    }

    function symbol() public constant returns (string) {
        return tokenSymbol;
    }

    function totalSupply() public view returns (uint256) {
        return cars.length - 1;
    }

    function balanceOf(address _owner) public constant returns (uint balance) {
        return balances[_owner];
    }

    function ownerOf(uint256 _tokenId) public constant returns (address) {
        require(tokenExists[_tokenId]);
        return tokenOwners[_tokenId];
    }

    function approve(address _to, uint256 _tokenId) public {
        require(msg.sender == ownerOf(_tokenId));
        require(msg.sender != _to);

        allowed[msg.sender][_to] = _tokenId;
        ApprovalEvent(msg.sender, _to, _tokenId);
    }

    function takeOwnership(uint256 _tokenId) public {
        require(tokenExists[_tokenId]);

        address oldOwner = ownerOf(_tokenId);
        address newOwner = msg.sender;

        require(newOwner != oldOwner);

        require(allowed[oldOwner][newOwner] == _tokenId);
        balances[oldOwner] -= 1;
        tokenOwners[_tokenId] = newOwner;

        balances[newOwner] += 1;
        TransferEvent(oldOwner, newOwner, _tokenId);
    }

    function transfer(address _to, uint256 _tokenId) public {
        address currentOwner = msg.sender;
        address newOwner = _to;

        require(tokenExists[_tokenId]);

        require(currentOwner == ownerOf(_tokenId));
        require(currentOwner != newOwner);
        require(newOwner != address(0));
        removeFromTokenList(currentOwner, _tokenId);

        balances[currentOwner] -= 1;
        tokenOwners[_tokenId] = newOwner;

        balances[newOwner] += 1;
        TransferEvent(currentOwner, newOwner, _tokenId);
    }

    function tokenOfOwnerByIndex(address _owner, uint256 _index) public constant returns (uint tokenId) {
        return ownerTokens[_owner][_index];
    }

    function tokenMetadata(uint256 _tokenId) public constant returns (string infoUrl) {
        return tokenLinks[_tokenId];
    }

    function removeFromTokenList(address _owner, uint256 _tokenId) private {
        for (uint256 i = 0; ownerTokens[_owner][i] != _tokenId; i++) {
            ownerTokens[_owner][i] = 0;
        }
    }

}
