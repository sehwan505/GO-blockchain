// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";

import "./SaleToken.sol";

contract MintToken is ERC721Enumerable {
    constructor() ERC721("hado505", "h505") {}

    SaleToken public saleToken;

    mapping(uint256 => uint256) public tokenTypes;

    struct TokenData {
        uint256 TokenId;
        uint256 TokenType;
        uint256 TokenPrice;
    }

    function mintToken() public {
        uint256 TokenId = totalSupply() + 1;
        uint256 TokenType = uint256(keccak256(abi.encodePacked(block.timestamp, msg.sender, TokenId))) % 10 + 1;

        tokenTypes[TokenId] = TokenType;
        _mint(msg.sender, TokenId);
    }

    function setSaleToken(address _saleToken) public {
        saleToken = SaleToken(_saleToken);
    }
}