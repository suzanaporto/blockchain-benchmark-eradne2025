'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const fs = require('fs');

//npx caliper launch manager --caliper-workspace . --caliper-benchconfig benchmark-config.yaml --caliper-networkconfig networks/networkConfig.json --caliper-flow-only-test

class SamplePatientDataWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }


    async loadTestData() {
        const rawData = fs.readFileSync('/home/suzanaporto/hyperledger3/benchmark-test-eradne2025/data/patient_data_generator/data_2.json', 'utf-8');
        return JSON.parse(rawData);
    }


    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        this.workerIndex = workerIndex;
        this.roundArguments = roundArguments;
        this.sutAdapter = sutAdapter;
        this.sutContext = sutContext;
        
        this.contractId = this.roundArguments.contractId;
        this.sampleDataArray = await this.loadTestData();
        // this.sender = this.roundArguments.senderAddress;
        this.contractAddress = sutContext.contracts[this.contractId].address;
    }
    
    async submitTransaction() {
        for(let obj of this.sampleDataArray){
            console.log(obj)
            const request = {
                contract: this.contractId, // E.g., 'BenchmarkTest'
                verb: 'createPatientData',         // Function name
                args: [obj], // All args must be strings
                to: this.contractAddress, // Optional but useful
                gas: 500000
            };
            // from: this.sutContext.fromAddress,
            
            
            await this.sutAdapter.sendRequests(request);
            // const element = array[index];
        }
            
    }
}

function createWorkloadModule() {
    return new SamplePatientDataWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;