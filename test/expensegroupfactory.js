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
      
      const expenseGroups = await factoryContractInstance.getExpenseGroups();

      // let expenseGroupsSummary = [];

      // for(let i=0; i < expenseGroups.length; i++) {
      //    const expenseGroup = await ExpenseGroup.at(expenseGroups[i]) 
      //    let title = await expenseGroup.title.call();         
      //    let ownerAddress = await expenseGroup.memberAddresses.call(0);
      //    let ownerName = await expenseGroup.getMemberName(ownerAddress);
         
      //    let o = {
      //      expenseGroupTitle: title,
      //      expenseGroupOwner: ownerName
      //    };

      //    expenseGroupsSummary.push(o);         
      //    console.dir(o);
      // }

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
