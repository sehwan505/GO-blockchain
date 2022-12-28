// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./MyToken.sol";

contract SaleToken {
    MintToken public mintTokenAddress;

    constructor(address _mintTokenAddress){
        mintTokenAddress = MintToken(_mintTokenAddress);
    }

    mapping(uint256 => uint256) public tokenPrices;
    uint256[] public onSaleTokenArray;


    function setForSaleToken(uint256 _tokenId, uint256 _price) public {
        address tokenOwner = mintTokenAddress.ownerOf(_tokenId);


        require(tokenOwner == msg.sender, "is not token owner");
        require(_price > 0, "price will be upper zero");
        require(tokenPrices[_tokenId] == 0, "This token is already on sale");
        require(mintTokenAddress.isApprovedForAll(tokenOwner, address(this)), "token owner did not approve this token");

        tokenPrices[_tokenId] = _price;
        onSaleTokenArray.push(_tokenId);        
    }

    function purchaseToken(uint256 _tokenId) public payable {
        uint256 price = tokenPrices[_tokenId];
        address tokenOwner = mintTokenAddress.ownerOf(_tokenId);

        require(price != 0, "token is not on sale");
        require(price < msg.value, "caller sent lower than price");
        require(tokenOwner != msg.sender, "caller is token owener");

        payable(tokenOwner).transfer(msg.value);
        mintTokenAddress.safeTransferFrom(tokenOwner, msg.sender, _tokenId);

        tokenPrices[_tokenId] = 0;
        for (uint256 i = 0; i < onSaleTokenArray.length; i++){
            if (tokenPrices[onSaleTokenArray[i]] == 0){
                onSaleTokenArray[i] = onSaleTokenArray[onSaleTokenArray.length - 1];
                onSaleTokenArray.pop();
            }
        }
    }

    function getOnSaleTokenArrayLength() view public returns (uint256) {
        return onSaleTokenArray.length;
    }

    function getTokenPrice(uint256 _tokenId) view public returns (uint256) {
        return tokenPrices[_tokenId];
    }
}