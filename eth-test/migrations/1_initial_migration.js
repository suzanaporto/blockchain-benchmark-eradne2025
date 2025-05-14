var MyContract = artifacts.require("BenchmarkTest");

module.exports = function(deployer) {
  // deployment steps
  deployer.deploy(MyContract);
};