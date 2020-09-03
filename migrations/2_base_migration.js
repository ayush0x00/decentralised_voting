const base_contract = artifacts.require("base_contract");

module.exports = function(deployer) {
  deployer.deploy(base_contract);
};
