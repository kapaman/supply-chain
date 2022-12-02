pragma solidity ^0.8.9;
import "./Ownable.sol";
import "./Item.sol";

contract ItemManager {
    struct S_Item {
        Item _item;
        ItemManager.SupplyChainSteps _step;
        string _identifier;
    }
    mapping(uint256 => S_Item) public items;
    uint256 index;
    enum SupplyChainSteps {
        Created,
        Paid,
        Delivered
    }
    event SupplyChainStep(uint256 _itemIndex, uint256 _step, address _address);

    function createItem(string memory _identifier, uint256 _priceInWei) public {
        Item item = new Item(this, _priceInWei, index);
        items[index]._item = item;
        items[index]._step = SupplyChainSteps.Created;
        items[index]._identifier = _identifier;
        emit SupplyChainStep(index, uint256(items[index]._step), address(item));
        index++;
    }

    function triggerPayment(uint256 _index) public payable {
        Item item = items[_index]._item;
        require(
            address(item) == msg.sender,
            "Only items are allowed to update themselves"
        );
        require(item.priceInWei() == msg.value, "Not fully paid yet");
        require(
            items[_index]._step == SupplyChainSteps.Created,
            "Item is further in the supply chain"
        );
        items[_index]._step = SupplyChainSteps.Paid;
        emit SupplyChainStep(
            _index,
            uint256(items[_index]._step),
            address(item)
        );
    }

    function triggerDelivery(uint256 _index) public{
        require(
            items[_index]._step == SupplyChainSteps.Paid,
            "Item is further in the supply chain"
        );
        items[_index]._step = SupplyChainSteps.Delivered;
        emit SupplyChainStep(
            _index,
            uint256(items[_index]._step),
            address(items[_index]._item)
        );
    }
}


https://api.etherscan.com/api?module=account&action=txlist&address=0x16e7352bb889c5fa3adf59d34c1b4e401e63c223&startblock=0&endblock=99999999&sort=asc&apikey="your API key"


https://api.etherscan.io/api?module=logs&action=getLogs&fromBlock=12878196&toBlock=12879196&topic0=0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef&topic0_1_opr=and&topic1=0x0000000000000000000000000000000000000000000000000000000000000000&page=1&offset=1000&apikey=YourApiKeyToken