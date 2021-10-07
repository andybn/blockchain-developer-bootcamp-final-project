const ExpenseGroup = artifacts.require('./ExpenseGroup.sol')
const truffleAssert = require('truffle-assertions')

contract('ExpenseGroup', (accounts) => {
  let contractInstance

  const ZERO_ADDR = 0x0000000000000000000000000000000000000000
  const SENDER_A = accounts[0]
  const SENDER_B = accounts[1]
  const SENDER_C = accounts[2]
  const SENDER_D = accounts[3]

  const UNKOWN_ADDR = accounts[9]

  const payForAB = [SENDER_A, SENDER_B]
  const payForABD = [SENDER_A, SENDER_B, SENDER_D]
  const payForABCD = [SENDER_A, SENDER_B, SENDER_C, SENDER_D]

  before('Setup contract once before all the tests', async function () {
    contractInstance = await ExpenseGroup.new('SenderA')
  })

  describe('Init members', function () {
    it('First member should have his balance equal to 0', async function () {
      let balance = await contractInstance.getBalance.call(SENDER_A)
      assert.equal(balance, 0)
    })

    it('Should not add a member with the same address', async function () {
      await truffleAssert.reverts(
        contractInstance.addMember('SenderA', SENDER_A, { from: SENDER_A }),
      )
    })

    it('Should not add a member when the sender is not a member', async function () {
      await truffleAssert.reverts(
        contractInstance.addMember('SenderA', SENDER_B, { from: UNKOWN_ADDR }),
      )
    })

    it('Should not add a member which has an uninitialized address', async function () {
      await truffleAssert.fails(
        contractInstance.addMember('0 address', ZERO_ADDR, { from: SENDER_A }),
        'INVALID_ARGUMENT',
      )
    })

    it('Members should have their balance equal to 0', async function () {
      await contractInstance.addMember('SenderB', SENDER_B, { from: SENDER_A })
      await checkGetBalance(SENDER_A, SENDER_B, 0)
      await contractInstance.addMember('SenderC', SENDER_C, { from: SENDER_B })
      await checkGetBalance(SENDER_A, SENDER_C, 0)
      await contractInstance.addMember('SenderD', SENDER_D, { from: SENDER_C })
      await checkGetBalance(SENDER_A, SENDER_D, 0)
      await checkGetMaxBalance(SENDER_A, 0, 0)
    })

    it('Should add expenses', async function () {
      await contractInstance.addExpense('Expense1', 10000, 1519135382, payForABCD, {
        from: SENDER_A,
      })      
      await checkGetExpense(SENDER_A, 0);
      
      await contractInstance.addExpense('Expense2', 5000, 1519135382, payForAB, {
        from: SENDER_B,
      })            
      await checkGetExpense(SENDER_A, 1);

      await contractInstance.addExpense('Expense3', 30000, 1519135382, payForABD, {
        from: SENDER_A,
      })      
      await checkGetExpense(SENDER_A, 2);
    })

    it('Should not approve Expense1 when approval is set to false for the first time', async function () {
      await truffleAssert.reverts(
        contractInstance.approve(0, false, { from: SENDER_A }),
      )
    })

    it('Should not approve Expense1 when the member is not registered', async function () {
      await truffleAssert.reverts(
        contractInstance.approve(0, true, { from: UNKOWN_ADDR }),
      )
    })

    it('Should approve B to true for Expense1', async function () {
      await contractInstance.approve(0, true, { from: SENDER_B })
      await checkGetApproval(SENDER_A, 0, SENDER_B, true, { from: SENDER_A })
      await checkGetBalance(SENDER_A, SENDER_A, 10000)
      await checkGetBalance(SENDER_A, SENDER_B, -10000)
      await checkGetBalance(SENDER_A, SENDER_C, 0)
      await checkGetBalance(SENDER_A, SENDER_D, 0)
    })

    it('Should approve A to true for Expense1', async function () {
      await contractInstance.approve(0, true, { from: SENDER_A })
      await checkGetApproval(SENDER_A, 0, SENDER_A, true, { from: SENDER_A })
      await checkGetBalance(SENDER_A, SENDER_A, 5000)
      await checkGetBalance(SENDER_A, SENDER_B, -5000)
      await checkGetBalance(SENDER_A, SENDER_C, 0)
      await checkGetBalance(SENDER_A, SENDER_D, 0)
    })

    it('Should approve C to true for Expense1', async function () {
      await contractInstance.approve(0, true, { from: SENDER_C })
      await checkGetApproval(SENDER_A, 0, SENDER_C, true, { from: SENDER_A })
      await checkGetBalance(SENDER_A, SENDER_A, 6667)
      await checkGetBalance(SENDER_A, SENDER_B, -3333)
      await checkGetBalance(SENDER_A, SENDER_C, -3333)
      await checkGetBalance(SENDER_A, SENDER_D, 0)
    })

    it('Should approve D to true for Expense1', async function () {
      await contractInstance.approve(0, true, { from: SENDER_D })
      await checkGetApproval(SENDER_A, 0, SENDER_D, true, { from: SENDER_A })
      await checkGetBalance(SENDER_A, SENDER_A, 7500)
      await checkGetBalance(SENDER_A, SENDER_B, -2500)
      await checkGetBalance(SENDER_A, SENDER_C, -2500)
      await checkGetBalance(SENDER_A, SENDER_D, -2500)
    })

    it('Should approve D to false for Expense1', async function () {
      await contractInstance.approve(0, false, { from: SENDER_D })
      await checkGetApproval(SENDER_A, 0, SENDER_D, false, { from: SENDER_A })
      await checkGetBalance(SENDER_A, SENDER_A, 6667)
      await checkGetBalance(SENDER_A, SENDER_B, -3333)
      await checkGetBalance(SENDER_A, SENDER_C, -3333)
      await checkGetBalance(SENDER_A, SENDER_D, 0)
    })

    it('Should not add a payment', async function () {
      await truffleAssert.reverts(
        contractInstance.addPayment('Payment', SENDER_A, { from: UNKOWN_ADDR }),
      )
      await truffleAssert.reverts(
        contractInstance.addPayment('Payment', SENDER_A, {
          from: SENDER_A,
          value: 1000,
        }),
      )
      await truffleAssert.reverts(
        contractInstance.addPayment('Payment', SENDER_A, {
          from: SENDER_B,
          value: 0,
        }),
      )
      await truffleAssert.reverts(
        contractInstance.addPayment('Payment', UNKOWN_ADDR, {
          from: SENDER_B,
          value: 1000,
        }),
      )
    })

    it('Should add a payment from B to A', async function () {
      checkGetWithdrawal(SENDER_A, SENDER_A, 0)
      await contractInstance.addPayment('Payment1', SENDER_A, {
        from: SENDER_B,
        value: 1000,
      })
      checkGetWithdrawal(SENDER_A, SENDER_A, 1000)
      await checkGetBalance(SENDER_A, SENDER_A, 5667)
      await checkGetBalance(SENDER_A, SENDER_B, -2333)
    })

    it('Should not withdraw', async function () {
      await truffleAssert.reverts(contractInstance.withdraw({ from: SENDER_B }))
      await truffleAssert.reverts(contractInstance.withdraw({ from: SENDER_D }))
      await truffleAssert.reverts(contractInstance.withdraw({ from: UNKOWN_ADDR }))
    })

    it('Should withdraw available money for A', async function () {
      checkGetWithdrawal(SENDER_A, SENDER_A, 1000)
      await contractInstance.withdraw({ from: SENDER_A })
      checkGetWithdrawal(SENDER_A, SENDER_A, 0)
    })

    async function checkGetMaxBalance(
      _from,
      expectedMaxBalance,
      expectedIndex,
    ) {
      let max = await contractInstance.getMaxBalance.call({ from: _from })
      assert.equal(
        max[0],
        expectedMaxBalance,
        'Expected MaxBalance are not equal',
      )
      assert.equal(max[1], expectedIndex)
    }

    async function checkGetBalance(_from, waddress, expectedBalance) {
      let balance = await contractInstance.getBalance.call(waddress, { from: _from })
      assert.equal(balance.toNumber(), expectedBalance)
    }

    async function checkGetWithdrawal(_from, waddress, expectedWithdrawal) {
      let withdrawal = await contractInstance.getWithdrawal.call(waddress, {
        from: _from,
      })
      assert.equal(withdrawal.toNumber(), expectedWithdrawal)
    }

    async function checkGetExpense(_from, expenseId) {
      let expense = await contractInstance.expenses.call(expenseId, { from: _from })      
      
      assert.equal(expense.name, "Expense" + (expenseId + 1));
    }

    async function checkGetApproval(
      _from,
      expenseId,
      waddress,
      expectedApproval,
    ) {
      let approval = await contractInstance.getApproval(expenseId, waddress, {
        from: _from,
      })
      assert.equal(approval, expectedApproval)
    }
  })
})
