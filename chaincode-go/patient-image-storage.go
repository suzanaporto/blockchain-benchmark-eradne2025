package main

import (
	"fmt"

	"github.com/hyperledger/fabric-contract-api-go/contractapi"
)

// SmartContract provides functions for storing and retrieving patient image permalinks
type SmartContract struct {
	contractapi.Contract
}

// Store stores a permalink associated with a patient hash
func (s *SmartContract) Store(ctx contractapi.TransactionContextInterface, patientHash string, permalink string) error {
	if len(patientHash) == 0 {
		return fmt.Errorf("patientHash must not be empty")
	}
	if len(permalink) == 0 {
		return fmt.Errorf("permalink must not be empty")
	}
	return ctx.GetStub().PutState(patientHash, []byte(permalink))
}

// Retrieve returns the permalink associated with a patient hash
func (s *SmartContract) Retrieve(ctx contractapi.TransactionContextInterface, patientHash string) (string, error) {
	if len(patientHash) == 0 {
		return "", fmt.Errorf("patientHash must not be empty")
	}
	permalinkBytes, err := ctx.GetStub().GetState(patientHash)
	if err != nil {
		return "", fmt.Errorf("failed to read from world state: %v", err)
	}
	if permalinkBytes == nil {
		return "", fmt.Errorf("no record found for patientHash: %s", patientHash)
	}
	return string(permalinkBytes), nil
}

func main() {
	chaincode, err := contractapi.NewChaincode(new(SmartContract))
	if err != nil {
		panic(fmt.Sprintf("Error creating chaincode: %v", err))
	}
	if err := chaincode.Start(); err != nil {
		panic(fmt.Sprintf("Error starting chaincode: %v", err))
	}
}
