// var MyContract = artifacts.require("BenchmarkTest");
var SampleData = artifacts.require("SampleDataCR");

module.exports = function(deployer) {
  // deployment steps
  // deployer.deploy(MyContract);
  deployer.deploy(SampleData);
};