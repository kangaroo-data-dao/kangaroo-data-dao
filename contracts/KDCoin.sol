// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

interface IERC20 {

    // Total Supply Cap
    function totalSupply() external view returns (uint256);

    // Balance Of Holder
    function balanceOf(address account) external view returns (uint256);

    // Set allowance
    function allowance(address owner, address spender) external view returns (uint256);

    // Make Transfer
    function transfer(address recipient, uint256 amount) external returns (bool);

    // Approve allowance
    function approve(address spender, uint256 amount) external returns (bool);

    // Transfer From
    function transferFrom(address sender, address recipient, uint256 amount) external returns (bool);

    // Event
    event Transfer(address indexed from, address indexed to, uint256 value);

    // Event
    event Approval(address indexed owner, address indexed spender, uint256 value);

}



contract KDCoin is IERC20 {
    string public name;
    address public contractAddress;
    string public constant symbol = "ERC";
    uint8 public constant decimals = 18;
    mapping(address => uint256) balances;
    mapping(address => mapping (address => uint256)) allowed;
    uint256 totalSupply_ = 10 ether;

    constructor(string memory _name, address _contractAddress) {
        name = _name;
        contractAddress = _contractAddress;
        balances[msg.sender] = totalSupply_;
    }

    function totalSupply() public override view returns (uint256) {
        return totalSupply_;
    }


    function balanceOf(address tokenOwner) public override view returns (uint256) {

        return balances[tokenOwner];

    }


    function transfer(address receiver, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[msg.sender]);
        balances[msg.sender] = balances[msg.sender]-numTokens;
        balances[receiver] = balances[receiver]+numTokens;
        emit Transfer(msg.sender, receiver, numTokens);
        return true;
    }


    function approve(address delegate, uint256 numTokens) public override returns (bool) {
        allowed[msg.sender][delegate] = numTokens;
        emit Approval(msg.sender, delegate, numTokens);
        return true;
    }


    function allowance(address owner, address delegate) public override view returns (uint) {
        return allowed[owner][delegate];
    }


    function transferFrom(address owner, address buyer, uint256 numTokens) public override returns (bool) {
        require(numTokens <= balances[owner], "Insufficient Balance");
        require(numTokens <= allowed[owner][msg.sender] || msg.sender == contractAddress, "Invalid Sender");
        balances[owner] = balances[owner]-numTokens;
        allowed[owner][msg.sender] = allowed[owner][msg.sender]-numTokens;
        balances[buyer] = balances[buyer]+numTokens;
        emit Transfer(owner, buyer, numTokens);
        return true;
    }

}


