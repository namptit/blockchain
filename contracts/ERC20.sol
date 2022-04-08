// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./IERC20.sol";

contract ERC20 is IERC20 {
    mapping (address => uint256) private balances;
    mapping (address => mapping (address => uint256)) private allowances;
    uint256 private totalSupplyToken;
    string private tokenName;
    string private tokenSymbol;
   
    constructor (string memory _name, string memory _symbol) {
        tokenName = _name;
        tokenSymbol = _symbol;
    }
    
    function name() public view virtual returns (string memory) {
        return tokenName;
    }
   
    function symbol() public view virtual returns (string memory) {
        return tokenSymbol;
    }
   
    function decimals() public view virtual returns (uint8) {
        return 18;
    }
    
    function totalSupply() public view virtual override returns (uint256) {
        return totalSupplyToken;
    }

    function balanceOf(address account) public view virtual override returns (uint256) {
        return balances[account];
    }

    function transfer(address recipient, uint256 amount) public virtual override returns (bool) {
        require(amount <= balances[msg.sender]);
        uint balanceOwner = balances[msg.sender];
        uint balanceRecipient = balances[msg.sender];

        balances[msg.sender] = balanceOwner - amount;
        balances[recipient] = balanceRecipient + amount;
        emit Transfer(msg.sender, recipient, amount);
        return true;
    }

    function allowance(address owner, address spender) public view virtual override returns (uint256) {
        return allowances[owner][spender];
    }

    function approve(address spender, uint256 amount) public virtual override returns (bool) {
        address owner = msg.sender;
        allowances[owner][spender] = amount;
        emit Approval(owner, spender, amount);
        return true;
    }

    function transferFrom(address owner, address recipient, uint256 amount) public virtual override returns (bool) {
        require(amount <= balances[owner]);
        require(amount <= allowances[owner][msg.sender]);

        uint balanceSender = balances[owner];
        uint balanceRecipient = balances[recipient];
        uint alowanceBalance = allowances[owner][msg.sender];

        balances[owner] =  balanceSender - amount;
        balances[recipient] = balanceRecipient + amount;
        allowances[owner][msg.sender] = alowanceBalance - amount;
        
        emit Transfer(owner, recipient, amount);
        return true;
    }

    function mint(address account, uint256 amount) internal virtual {
        require(account != address(0), "ERC20: mint to the zero address");

        totalSupplyToken += amount;
        balances[account] += amount;
    }

}