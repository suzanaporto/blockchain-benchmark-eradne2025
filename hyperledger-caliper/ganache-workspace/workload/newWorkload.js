'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const { v4: uuidv4 } = require('uuid');

class NewWorkload extends WorkloadModuleBase {

    constructor() {
        super();
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        this.workerIndex = workerIndex;
        this.roundArguments = roundArguments;
        this.sutAdapter = sutAdapter;
        this.sutContext = sutContext;
        
        this.contractId = this.roundArguments.contractId;
        this.sender = this.roundArguments.senderAddress;
        this.contractAddress = sutContext.contracts[this.contractId].address;
    }

    async submitTransaction() {
        const recipient = '0xB8AF14Cd728562034b735FCE7989665EC0d8fae3'; // Hardcoded or rotate for testing
        const id = Math.floor(Math.random() * 1000000);
        const message = `Hello-${uuidv4()}`;

        const request = {
            contract: this.contractId, // E.g., 'BenchmarkTest'
            verb: 'sendData',         // Function name
            args: [recipient, id.toString(), message], // All args must be strings
            from: this.sender,
            to: this.contractAddress, 
            gas: 500000               // Optional but useful
        };

        await this.sutAdapter.sendRequests(request);
    }
}

function createWorkloadModule() {
    return new NewWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;
