// SPDX-License-Identifier: GPL-3.0

pragma solidity >=0.8.2 <0.9.0;

/**
 * @title Storage
 * @dev Store & retrieve value in a variable
 * @custom:dev-run-script ./scripts/deploy_with_ethers.ts
 */
contract PatientImageStorage  {

    mapping(string => string) private patientImages;


    function store(string calldata patientHash, string calldata permalink) external {
        patientImages[patientHash] = permalink;
    }

    /**
     * @dev Return value 
     * @return value of 'number'
     */
    function retrieve(string calldata patientHash) external view returns (string memory) {
        return patientImages[patientHash];
    }
}