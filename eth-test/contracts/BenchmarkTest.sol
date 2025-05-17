// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract BenchmarkTest {

    struct Data {
        uint256 id;
        string message;
        address sender;
    }

    mapping(address => Data) public receivedData;

    event DataSent(address indexed from, address indexed to, uint256 id, string message);
    event BatchDataSent(address indexed from, address[] recipients);

    function sendData(address _to, uint256 _id, string memory _message) public {
        require(_to != address(0), "Invalid recipient");

        Data memory newData = Data({
            id: _id,
            message: _message,
            sender: msg.sender
        });

        receivedData[_to] = newData;

        emit DataSent(msg.sender, _to, _id, _message);
    }

    function sendBatchData(address[] memory _recipients, uint256[] memory _ids, string[] memory _messages) public {
        require(_recipients.length == _ids.length && _recipients.length == _messages.length, "Array lengths must match");

        for (uint256 i = 0; i < _recipients.length; i++) {
            require(_recipients[i] != address(0), "Invalid recipient");

            Data memory newData = Data({
                id: _ids[i],
                message: _messages[i],
                sender: msg.sender
            });

            receivedData[_recipients[i]] = newData;
        }

        emit BatchDataSent(msg.sender, _recipients);
    }

    function getData(address _owner) public view returns (Data memory) {
        return receivedData[_owner];
    }
}