import FormData from 'form-data';
import fs from 'fs';
import path from 'path';
import axios from 'axios';
import Web3 from 'web3';
import contractAbi from './contract.abi.json' with {type: "json"}

const contractAddress = "0xd8b934580fcE35a11B58C6D73aDeE468a2833fa8";
const accountAddress = "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4";
const privateKey = "3a94c5f2a379e6c47f86fecdfa82c9ff26997cc338d6b90373a2934901c99875";
const infuraHost = "https://sepolia.infura.io/v3/0e8a3f90e08e40e2bfc900bab71aea16";
// const infuraHost = "https://eth-mainnet.g.alchemy.com/v2/QnBVQjRWt3gaPx9_5T9Id_Z6Uomzl59G";


const loginCredentials = {
  UserEmail: 'beatriz@trilogo.com.br',
  UserPassword: 'Ethereum123',
};
let JWT_TOKEN = 'eyJraWQiOiJ6MERxcnFEbm9OR3BBYVI1Z2FMRkRHT3I5THhXb1Rkd2VFVHpsNGJYbzlJPSIsImFsZyI6IlJTMjU2In0.eyJzdWIiOiJiYWEyNmZkNS0yYzRjLTQzNzktYjUzYS0wZDI5NWFlOWU1N2YiLCJjdXN0b206c3ViZG9tYWluIjoiZGV2IiwiY3VzdG9tOmNvbXBhbnlHcm91cE5hbWUiOiJEZXYiLCJjdXN0b206RG9tYWluSXNUcmljb25uZWN0ZWQiOiIxIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImN1c3RvbTpnaXZlbl9uYW1lIjoiV2FzaGluZ3RvbiIsImN1c3RvbTpjb21wYW55R3JvdXBJZCI6Ijg4IiwiaXNzIjoiaHR0cHM6XC9cL2NvZ25pdG8taWRwLnVzLWVhc3QtMS5hbWF6b25hd3MuY29tXC91cy1lYXN0LTFfZnBtMjNhVFVRIiwiY29nbml0bzp1c2VybmFtZSI6Indhc2hpbmd0b25AdHJpbG9nby5jb20uYnIiLCJjdXN0b206ZG9tYWluVHlwZSI6IjEiLCJjdXN0b206dW5pcXVlX25hbWUiOiIxMjcyIiwiY3VzdG9tOnRpbWVab25lIjoiQW1lcmljYVwvU2FvX1BhdWxvIiwiYXVkIjoiNmpla2ZzNXI2aXZnYWdxYzdscGdkMzczZXIiLCJldmVudF9pZCI6ImI5N2VjYTlkLTQ2MGItNGI2ZS1hZGJjLTVkMTk1MWE0MWM2ZSIsInRva2VuX3VzZSI6ImlkIiwiYXV0aF90aW1lIjoxNzQ1ODcyMzE0LCJjdXN0b206ZmVhdHVyZV9mbGFncyI6IjYiLCJleHAiOjE3NDc3ODQ3NTAsImN1c3RvbTp1c2VyX3R5cGUiOiIxIiwiaWF0IjoxNzQ3NzgxMTUwLCJlbWFpbCI6Indhc2hpbmd0b25AdHJpbG9nby5jb20uYnIifQ.do0z3EyWyu1a2Asor3_-_7sAV6K_FoZvnhft4wbR6b7CiLqipRC4td7U6e5aKjd22RtOpf-lYeWjgGk1GLYUMt64lqQcTiTf6xoqYiP1bf9LtTdhQwyQUSERmY1E0e8PZwkVRHz2YVQXgZtBhor6dSTBprEHS5KhIO5ZgfrrjPSO3JKVwfI1yIyn7oH-VELI38dwXgFUktGv5ZYcDCMC5_npceWJ7KKqVwrH55FcFjGUs5NuIJkfFLufnXQFmluAnn_fAkqZrzm6psNQYGltYnjH_093PR97ytdtP5bB2AMU13QcTOAmBA8zDWlbqwWfOWl4NO67bd6Ogej6WcZYrw';

const datasetDir = '../chest_images/';

const CREDENTIALS = {
  nome: 'Washington Praxedes',
  cpf: '12345678900'
};


async function uploadImage(filePath) {
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

async function initBlockchain() {
    const web3 = new Web3(new Web3.providers.HttpProvider(infuraHost));
    // const account = web3.eth.accounts.privateKeyToAccount('0x' + privateKey);
    // const wallet = web3.eth.accounts.wallet.add(account);
    let account2 = await web3.eth.getAccounts();
    console.log(account2);
    let storageContract = new web3.eth.Contract(contractAbi, contractAddress);
    return [storageContract, web3];
}

async function storeData(web3, storageContract, permalink, hashUser) {
    console.log(storageContract);
    console.log(web3);


    const method_abi = storageContract.methods.store(hashUser, permalink).encodeABI();
    const tx = {
        from: account.address,
        to: contractAddress,
        data: method_abi,
        value: '0',
        gasPrice: (264417514649 * (increase || 1)).toString(),
        // maxFeePerGas: '371316469291',
    };
    console.log(tx);
    const gas_estimate = await web3.eth.estimateGas(tx);
    tx.gas = gas_estimate;

    const signedTx = await web3.eth.accounts.signTransaction(
        tx, account.privateKey
    );
    console.log("Raw transaction data: " + (signedTx).rawTransaction);
    // Sending the transaction to the network
    const receipt = await web3.eth
        .sendSignedTransaction(signedTx.rawTransaction)
        .once("transactionHash", (txhash) => {
            console.log(`Mining transaction ...`);
            console.log(`https://sepolia.etherscan.io/tx/${txhash}`);
        });
    // The transaction is now on chain!
    console.log(`Mined in block ${receipt.blockNumber}`);
}


async function main() {
    JWT_TOKEN = await authenticateAndGetJWT();

    let [storage, web3] = await initBlockchain();

    const hash = await generateIdentificationHash();

    const files = fs.readdirSync(datasetDir).filter(file => {
        const ext = path.extname(file).toLowerCase();
        return ['.jpg', '.jpeg', '.png', '.gif'].includes(ext);
    });

    for (const file of files) {
        const filePath = path.join(datasetDir, file);
        console.log(`🔄 Enviando ${file}...`);

        const [result] = await uploadImage(filePath);
        console.log('Arquivo enviado');
        console.log(result);

        if (result) {
            await storeData(web3, storage, result.permalink, hash);
            console.log('transação realizada');
        }
    }

}


await main();


