// SPDX-License-Identifier: MIT
pragma solidity ^0.8.4;

import "./ExpenseGroup.sol";

contract ExpenseGroupFactory {
    ExpenseGroup[] public expenseGroups;
    uint256 disabledCount;

    event ExpenseGroupCreated(
        address indexed _expenseGroupAddress,
        string indexed _name
    );

    function createExpenseGroup(string memory _name) external {
        ExpenseGroup expenseGroup = new ExpenseGroup(msg.sender,_name);
        expenseGroups.push(expenseGroup);
        emit ExpenseGroupCreated(address(expenseGroup), _name);
    }

    function getExpenseGroups()
        external
        view
        returns (ExpenseGroup[] memory)
    {
        return expenseGroups;
    }
}
