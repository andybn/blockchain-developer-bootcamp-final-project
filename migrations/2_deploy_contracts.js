var ExpenseGroup = artifacts.require("./ExpenseGroup.sol");

module.exports = function(deployer) {
  deployer.deploy(ExpenseGroup, "Owner");
};
