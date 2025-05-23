'use strict';

const { WorkloadModuleBase } = require('@hyperledger/caliper-core');
const fs = require('fs');
const FormData = require('form-data')
const path = require('path')
const axios = require('axios')
const loginCredentials = { UserEmail: 'beatriz@trilogo.com.br', UserPassword: 'Ethereum123',};
const CREDENTIALS = {nome: 'Washington Praxedes',cpf: '12345678900'};
const datasetDir = '/home/suzanaporto/hyperledger3/benchmark-test-eradne2025/chest_images';
const files = fs.readdirSync(datasetDir).filter(file => {
    const ext = path.extname(file).toLowerCase();
    return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
});

//npx caliper launch manager --caliper-workspace . --caliper-benchconfig benchmark-config.yaml --caliper-networkconfig networks/networkConfig.json --caliper-flow-only-test

async function authenticateAndGetJWT() {
    try {
        const response = await axios.post(
        'https://web.api.trilogo.app/api/Login/SignIn',
        loginCredentials
        );
        const jwt = response.data?.accessToken || response.data?.accessToken;
        if (!jwt) throw new Error('JWT not found in response');
        return jwt;
    } catch (error) {
        console.error('Failed to authenticate and get JWT:', error.response?.data || error.message);
        return null;
    }
}

async function generateIdentificationHash() {
    try {
        const response = await axios.post('http://localhost:3000/identificacao', CREDENTIALS);
        return response.data.hash;
    } catch (error) {
        console.error('Error generating identification hash:', error.response?.data || error.message);
        return null;
    }
}

async function uploadImage(filePath, JWT_TOKEN) {
    const form = new FormData();
    form.append('file', fs.createReadStream(filePath));

    try {
        const response = await axios.post(
        'https://upload.api.trilogo.app/upload',
        form,
        {
            headers: {
            ...form.getHeaders(),
            Authorization: `Bearer ${JWT_TOKEN}`,
            },
        }
        );

        return response.data; // espera-se que retorne { filename, permalink }
    } catch (error) {
        console.error(`Erro ao enviar ${filePath}:`, error.response?.data || error.message);
        return null;
    }
}


class PatientImageWorkload extends WorkloadModuleBase {
    constructor() {
        super();
    }

    async initializeWorkloadModule(workerIndex, totalWorkers, roundIndex, roundArguments, sutAdapter, sutContext) {
        this.workerIndex = workerIndex;
        this.roundIndex = roundIndex
        this.roundArguments = roundArguments;
        this.sutAdapter = sutAdapter;
        this.sutContext = sutContext;
        this.JWT_TOKEN = await authenticateAndGetJWT();
        this.hash = await generateIdentificationHash();
        this.localTxCounter = 0; // Initialize local counter
        [this.result] = await uploadImage(path.join(datasetDir, files[0]), this.JWT_TOKEN);
        this.contractId = this.roundArguments.contractId;
    }
    
    async submitTransaction() {
        try {
            // console.log("this.JWT_TOKEN", this.JWT_TOKEN);
            // console.log("this.datasetDir: ", this.datasetDir); //undefined
            console.log("hash:", this.hash);
            console.log("datasetDir: ", datasetDir);
            console.log("localTxCounter: ", this.localTxCounter);
            // console.log(files)
            // for (let file of files) {
            // const filePath = path.join(datasetDir, files[0]);
            // console.log(`🔄 Enviando ${files[0]}...`);
            
            // const result = { filename: "filename", permalink: "permalink" }
            console.log(this.result);
            this.localTxCounter++;
            if (this.result) {
                console.log("round index: ", this.roundIndex)
                console.log("worker index: ", this.workerIndex)
                const request = {
                    contractId: 'patient',
                    contractFunction: 'Store',
                    invokerIdentity: 'Admin',
                    contractArguments: [this.hash.toString(), this.result.permalink],
                    readOnly: false,
                };
                await this.sutAdapter.sendRequests(request);
                // const request = {
                //     contract: this.contractId, // E.g., 'BenchmarkTest'
                //     verb: 'store',         // Function name
                //     args: [this.hash.toString(), this.result.permalink], // All args must be strings
                //     to: this.contractAddress, // Optional but useful
                //     gas: 500000
                // };
                // // from: this.sutContext.fromAddress,
                // await this.sutAdapter.sendRequests(request);
                console.log('transação realizada');
            }
            // }
        }catch (error) {
        console.error(`Transaction failed: ${error}`);
        throw error;
        }
            
    }
}

function createWorkloadModule() {
    return new PatientImageWorkload();
}

module.exports.createWorkloadModule = createWorkloadModule;