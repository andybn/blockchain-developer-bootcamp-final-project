const ExpenseGroupFactory = artifacts.require('./ExpenseGroupFactory.sol')
const ExpenseGroup = artifacts.require('./ExpenseGroup.sol')

contract('ExpenseGroupFactory', (accounts) => {  
  let factoryContractInstance

  beforeEach('Setup contract factory once before all the tests', async function () {    
    factoryContractInstance = await ExpenseGroupFactory.new();
  })

  describe('ExpenseGroup creation logic', function () {
   
    it('Should succesfully create a ExpenseGroup contract instance', async function () {
      
      let eventEmitted = false;

      const tx = await factoryContractInstance.createExpenseGroup("SenderA", "WorldTrip", { from: accounts[0] })
      
      assert.equal(
        tx.logs[0].event,
        "ExpenseGroupCreated",
        "Expense group created",
      );

    })
  })
})
