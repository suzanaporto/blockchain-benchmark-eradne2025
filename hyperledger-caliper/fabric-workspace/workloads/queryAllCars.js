'use strict';

class QueryAllCarsWorkload {
    constructor() {}

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        this.sutAdapter = sutAdapter;
        this.sutContext = sutContext;
    }

    async submitTransaction() {
        const request = {
            contractId: 'fabcar',
            contractFunction: 'queryAllCars',
            invokerIdentity: 'Admin',
            contractArguments: [],
            readOnly: true,
        };
        await this.sutAdapter.sendRequests(request);
    }

    async cleanupWorkloadModule() {
        // Optional: any cleanup logic here
    }
}

function createWorkloadModule() {
    return new QueryAllCarsWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;