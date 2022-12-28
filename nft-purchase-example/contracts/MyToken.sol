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

    function getTokens(address _tokenOwner) view public returns (TokenData[] memory) {
        uint256 balanceLength = balanceOf(_tokenOwner);

        require(balanceLength != 0, "Owner doesn't have token");

        TokenData[] memory tokenData = new TokenData[](balanceLength);
        for (uint256 i = 0; i < balanceLength; i++){
            uint256 tokenId = tokenOfOwnerByIndex(_tokenOwner, i);
            uint256 tokenType = tokenTypes[tokenId];
            uint256 tokenPrice = saleToken.getTokenPrice(tokenId);

            tokenData[i] = TokenData(tokenId, tokenType, tokenPrice);
        }
        return tokenData;
    }
}