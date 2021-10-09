// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./ExpenseGroup.sol";

contract ExpenseGroupFactory {
    ExpenseGroup[] public expenseGroups;
    uint256 disabledCount;

    event ExpenseGroupCreated(
        address indexed _expenseGroupAddress,
        string indexed _ownerName
    );

    function createExpenseGroup(string memory _ownerName, string memory _title) external {
        ExpenseGroup expenseGroup = new ExpenseGroup(msg.sender, _ownerName, _title);
        expenseGroups.push(expenseGroup);
        emit ExpenseGroupCreated(address(expenseGroup), _ownerName);
    }

    function getExpenseGroups()
        external
        view
        returns (ExpenseGroup[] memory)
    {
        return expenseGroups;
    }
}
