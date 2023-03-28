// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract ExampleNFT is ERC721Enumerable, ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    uint256 public _price = 0.001 ether;

    constructor() ERC721("NFTP", "ENFTP") {}

    function mintNFT(
        address recipient,
        string memory tokenURI
    ) public payable returns (uint256) {
        require(msg.value >= _price, "Ether sent is not correct");
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function withdraw() public payable onlyOwner {
        address _owner = owner();
        uint256 amount = address(this).balance;
        (bool sent, ) = _owner.call{value: amount}("");
        require(sent, "Failed to send Ether");
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}

//0x927E3Cefd9EC3ce1661a978E834971b9AE41A3f5

//0xAa3eb5276D16E5B3261F6765536296C8945E346c -> Goerli latest with 0.001 NFT price

// 0x363E291574B59f432f80BdE7A06D664C7f5c5bC9 -> Mumbai, no NFT price

//0x6164BCFCE34bB42475ef4375c5Aa1B8e122F66e1 -> Mumbai latest, NFT price 0.001 Matic

//npx hardhat run scripts/deploy-contract.mjs --network PolygonMumbai
//npx hardhat run scripts/mint-nft.mjs --network PolygonMumbai
