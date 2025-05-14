'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');

/**
 * Workload module for sending data to a Solidity contract.
 */
class SendDataWorkload extends WorkloadModuleBase {
    /**
     * Initializes the workload module.
     * @param {Engine} engine The Caliper engine instance.
     * @returns {Promise<void>}
     */
    async initializeWorkloadModule(engine) {
        console.log('Initializing sendData workload module');
        console.log(this);
        console.log('Round Arguments from Engine:', engine.contractArguments);
        this.contractId = this.workerIndex % this.roundArguments.contractIds.length;
        this.contractName = this.roundArguments.contractIds[this.contractId];
        this.txIndex = 0;
    }

    /**
     * Assemble TXs for the round.
     * @returns {Promise<Tx[]>}
     */
    async generateWorkload() {
        const txs = [];
        const args = this.roundArguments;
        const senderAddress = args.senderAddress; // You might want to parameterize this
        const numTransactions = args.numbOfTxsPerClient || 1;

        for (let i = 0; i < numTransactions; i++) {
            this.txIndex++;
            const recipientAddress = `0x${Math.random().toString(16).slice(2, 42)}`; // Generate a random address
            const dataId = Math.floor(Math.random() * 1000000); // Generate a random ID
            const message = `Hello from Caliper - Transaction ${this.txIndex} - ${new Date().toISOString()}`;

            const tx = {
                abi: args.abi,
                contractId: this.contractName,
                contractFunction: 'sendData',
                contractArguments: [recipientAddress, dataId.toString(), message],
                invokerIdentity: senderAddress // Optional: Specify the invoker if needed
            };
            
            txs.push(tx);
        }
        
        return txs;
    }
    
    /**
     * Create a new block of requests with the specified number of transactions.
     * @param {number} nBlocks Number of transactions to include in the block.
     * @returns {Promise<Tx[]>}
    */
   async createNextBlock(nBlocks) {
       const txs = [];
       const args = this.roundArguments;
       const senderAddress = args.senderAddress; // You might want to parameterize this
       
       for (let i = 0; i < nBlocks; i++) {
           this.txIndex++;
           const recipientAddress = `0x${Math.random().toString(16).slice(2, 42)}`; // Generate a random address
           const dataId = Math.floor(Math.random() * 1000000); // Generate a random ID
           const message = `Another message from Caliper - Transaction ${this.txIndex} - ${new Date().toISOString()}`;
           
           const tx = {
               abi: args.abi,
               contractId: this.contractName,
               contractFunction: 'sendData',
               contractArguments: [recipientAddress, dataId.toString(), message],
                invokerIdentity: senderAddress // Optional: Specify the invoker if needed
            };

            txs.push(tx);
        }

        return txs;
    }
}

/**
 * Export the workload module.
 */
function createWorkloadModule() {
    return new SendDataWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;