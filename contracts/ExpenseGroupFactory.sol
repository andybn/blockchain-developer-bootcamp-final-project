// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ExpenseGroup.sol";

contract Factory {
    ExpenseGroup[] public expenseGroups;
    uint256 disabledCount;

    event ExpenseGroupCreated(
        address indexed _expenseGroupAddress,
        string indexed _name
    );

    function createExpenseGroup(string memory _name) external {
        ExpenseGroup expenseGroup = new ExpenseGroup(_name);
        expenseGroups.push(expenseGroup);
        emit ExpenseGroupCreated(address(expenseGroup), _name);
    }

    function getExpenseGroups()
        external
        view
        returns (ExpenseGroup[] memory _expenseGroups)
    {
        _expenseGroups = new ExpenseGroup[](
            expenseGroups.length - disabledCount
        );

        uint256 count;

        for (uint256 i = 0; i < expenseGroups.length; i++) {
           if(!expenseGroups[i].paused())
            _expenseGroups[count] = expenseGroups[i];
            count++;
        }
    }
}
