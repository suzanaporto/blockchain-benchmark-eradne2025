// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.19;

contract MedicalRecords {

    struct Record {
        string patientId;
        string condition;
        bool isCovidPositive;
    }

    mapping(string => Record) public records;

    function addRecord(string memory patientId,string memory condition,bool isCovidPositive) public {
        records[patientId] = Record(patientId, condition, isCovidPositive);
    }

    function getRecord(string memory patientId) public view returns (Record memory) {
        return records[patientId];
    }
}