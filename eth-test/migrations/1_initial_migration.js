// var MyContract = artifacts.require("BenchmarkTest");
var StorePatientData = artifacts.require("PatientImageStorage");

module.exports = function(deployer) {
  // deployment steps
  // deployer.deploy(MyContract);
  deployer.deploy(StorePatientData);
};