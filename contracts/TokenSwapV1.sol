// SPDX-License-Identifier: MIT
pragma solidity >=0.4.22 <0.9.0;
import "./IERC20.sol";


contract TokenSwapV1 {

    IERC20 private token1;
    address private owner1;
    IERC20 private token2;
    address private owner2;
    

    constructor(
        address _token1,
        address _owner1,
        address _token2,
        address _owner2
    ) {
        token1 = IERC20(_token1);
        owner1 = _owner1;
        token2 = IERC20(_token2);
        owner2 = _owner2;
    }

    function swap(uint amount1, uint amount2) public {
        require(msg.sender == owner1 || msg.sender == owner2, "Not authorized");
        require(amount1 == amount2, "Amounts are not equal");
        require(token1.allowance(owner1, address(this)) >= amount1, "Token 1 allowance too low");
        require(token2.allowance(owner2, address(this)) >= amount2, "Token 2 allowance too low");
        
        _safeTransferFrom(token1, owner1, owner2, amount1);
        _safeTransferFrom(token2, owner2, owner1, amount2);
    }

    function _safeTransferFrom(
        IERC20 token,
        address sender,
        address recipient,
        uint amount
    ) private {
        bool sent = token.transferFrom(sender, recipient, amount);
        require(sent, "Token transfer failed");
    }
}