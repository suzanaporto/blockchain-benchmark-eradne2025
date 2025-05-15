'use strict';

module.exports.info = 'Create a new car';

let contract;
let carNumber = 0;

module.exports.init = async function (bc, ctx, args) {
    contract = ctx.getContract(args.contractId);
    return Promise.resolve();
};

module.exports.run = async function () {
    carNumber++;
    const carId = `CAR${carNumber}`;
    await contract.submitTransaction('createCar', carId, 'Toyota', 'Corolla', 'Blue', 'Alice');
    return Promise.resolve();
};

module.exports.end = async function () {
    return Promise.resolve();
};