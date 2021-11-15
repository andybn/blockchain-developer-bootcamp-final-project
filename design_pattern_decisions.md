## Design patterns decisions

# Factory pattern (ExpenseGroupFactory)

* Create multiple 'Expense group' contract instances to keep track of them and make their management easier
* Improve security ensuring each expense group uses identical code and providing an easy lookup mechanism to find a expense group contract.
  
# Withdrawal pattern (ExpenseGroup)

* (Pull over push) It places the responsibility for claiming funds, on the recipient of the funds: the recipient has to send a transaction to withdraw and obtain their funds. 

* This can simplify a smart contract that is sending funds to recipients, because the contract does not have to handle the cases of what to do if sending the funds fail. A smart contract does not know whether sending the funds failed due to an actual error, or whether the recipient is a malicious smart contract that deliberately refuses to accept the funds.

# Emergency stop pattern (ExpenseGroup)

* Add an option to temporarily stop all contract operations in case of an emergency (due to bugs or security hacks).
