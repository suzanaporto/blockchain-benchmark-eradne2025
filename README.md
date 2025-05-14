# Simple Benchmark Test

This repo contains a simple benchmark for two blockchain networks (Ganache and Hyperledge Fabric)

## Prerequisites/Setup

### Blockchain Setup:
- Ganache(Ethereum)
    - Truffle v5.11.5 (core: 5.11.5)
    - Ganache v7.9.1
    - Solidity v0.5.16 (solc-js)
    - Node v22.9.0
    - Web3.js v1.10.0
- Hyperledge Fabric
    - Hyperledger Fabric

### Benchmark Setup:
- Hyperledger Caliper v0.6.0

### How to setup
 1. Install node and npm(follow truffle instructions)
 2. Install truffle and create a truffle project with truffle init

    ```bash
    $ npm install -g truffle 
    $ mkdir truffle-project && cd truffle-project
    $ truffle init
    ``` 
 3. Create a solidity contract in ```contracts``` folder
 4. Compile using truffle
    ```bash 
    $ truffle compile
    ``` 
 5. Create a js migration file in ```migrations``` folder
 6. Modify ```truffle-config.js```. Uncomment development and add gas parameter
 7. Start Ganache network and migrate your contract

## How to run