var ExpenseGroup = artifacts.require("./ExpenseGroup.sol");
var ExpenseGroupFactory = artifacts.require("./ExpenseGroupFactory.sol");

module.exports = function(deployer) {  
  deployer.deploy(ExpenseGroupFactory);
  deployer.deploy(ExpenseGroup, '0x8aAF2f2199A16C95DAC13632Ac0c0133e9e4dCEA', "SenderA", "WorldTrip");
};
