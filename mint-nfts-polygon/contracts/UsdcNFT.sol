// Contract based on https://docs.openzeppelin.com/contracts/4.x/erc721
// SPDX-License-Identifier: MIT
pragma solidity ^0.8.12;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";

contract UsdcNFT is ERC721URIStorage, Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _tokenIds;

    IERC20 public tokenAddress;
    uint256 public rate = 0.00001 * 10 ** 6;

    constructor(address _tokenAddress) ERC721("MyNFT", "MTK") {
        tokenAddress = IERC20(_tokenAddress);
    }

    function mintNFT(
        address recipient,
        string memory tokenURI
    ) public payable returns (uint256) {
        // require(msg.value >= _price, "Ether sent is not correct");
        tokenAddress.transferFrom(msg.sender, address(this), rate);
        _tokenIds.increment();

        uint256 newItemId = _tokenIds.current();
        _mint(recipient, newItemId);
        _setTokenURI(newItemId, tokenURI);

        return newItemId;
    }

    function withdrawToken() public onlyOwner {
        tokenAddress.transfer(
            msg.sender,
            tokenAddress.balanceOf(address(this))
        );
    }

    // Function to receive Ether. msg.data must be empty
    receive() external payable {}

    // Fallback function is called when msg.data is not empty
    fallback() external payable {}
}

//0x0b9c754426Ff72abE3A333736AD9D119D10A6C4C
