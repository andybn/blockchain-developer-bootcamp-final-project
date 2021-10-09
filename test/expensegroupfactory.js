const ExpenseGroupFactory = artifacts.require('./ExpenseGroupFactory.sol')
const ExpenseGroup = artifacts.require('./ExpenseGroup.sol')

contract('Expense group factory', (accounts) => {  
  let factoryContractInstance

  beforeEach('Setup contract factory once before all the tests', async function () {    
    factoryContractInstance = await ExpenseGroupFactory.new();
  })

  describe('ExpenseGroup creation', function () {
   
    it('Should succesfully create a ExpenseGroup contract instance', async function () {
      
      let eventEmitted = false;

      const tx = await factoryContractInstance.createExpenseGroup("SenderA", { from: accounts[0] })
      
      const expenseGroups = await factoryContractInstance.getExpenseGroups();

      //const expenseGroup = await ExpenseGroup.at(expenseGroups[0]);            

      //await expenseGroup.addMember('SenderB', accounts[1], { from: accounts[0] })            

      assert.equal(
        tx.logs[0].event,
        "ExpenseGroupCreated",
        "Expense group created",
      );

    })
  })
})
