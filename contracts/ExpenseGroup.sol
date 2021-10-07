// SPDX-License-Identifier: MIT
pragma solidity ^0.8.9;

/// @title ExpenseGroup smart contract allows to share and settle a group of expenses and track debts and credits.
/// @author Andrés Buenestado
contract ExpenseGroup {

    uint8 constant MAX_PAYEES = 20;

    /**
    Member is a person or company which is part of current expense group.
     */
    struct Member {
        uint256 identifier;
        string name;
        address memberAddress;
        int256 balance;
    }

    /**
    Expense is a cost incurred which needs to be paid back.
    It has an impact on the balance for payer / payees only when a payee gives its approval.
     */
    struct Expense {
        string name;
        uint256 amount;
        uint256 valueDate;
        uint256 creationDate;
        address payer;
        address[] payees;
        mapping(address => bool) approvals;
    }

    /**
    Payment is money transfer from one member to another.
    It can be use to settle a debt or a credit.
     */
    struct Payment {
        string title;
        uint256 amount;
        uint256 valueDate;
        address payer;
        address payee;
    }
    
    mapping(address => Member) public members;
    
    address[] public memberAddresses;

    /// Allow the creation of the first member when the contract instance is created.
    bool public isContractInstanceCreated = false;

    /// A mapping of expense identifier and expense.
    uint256 public numExpenses;
    mapping(uint256 => Expense) public expenses;
    
    Payment[] public payments;

    // A mapping of all the available withdrawals per address.
    mapping(address => uint256) public withdrawals;
    
    modifier restrictedToMember() {
        require(
            msg.sender == members[msg.sender].memberAddress ||
                !isContractInstanceCreated
        );
        _;
    }

    /// @notice Constructor. The creator of the smart contract will be the first member.    
    /// @param _name the name of the first member.
    constructor(string memory _name) {
        addMember(_name, msg.sender);
        isContractInstanceCreated = true;
    }

    /// @notice Adds a member. Only registered member can add new members.
    /// @param _name the name or alias of the member.
    /// @param _memberAddress the address of the member.
    function addMember(string memory _name, address _memberAddress)
        public
        restrictedToMember
    {
        require(
            _memberAddress != members[_memberAddress].memberAddress ||
                !isContractInstanceCreated
        ); 

        require(_memberAddress != address(0));

        Member memory member = Member({
            identifier: 0,
            name: _name,
            memberAddress: _memberAddress,
            balance: 0
        });

        memberAddresses.push(_memberAddress);
        member.identifier = memberAddresses.length - 1;
        members[_memberAddress] = member;
    }

    /// @notice Add an expense as payer. By default, the payer is the creator of the expense.
    /// @dev The number of payees are limited to a fixed number to avoid gas limit using loop.
    /// @param _title the title of the expense.
    /// @param _amount the amount of the expense. Must be superior to zero.
    /// @param _valueDate the value date of the expense.
    /// @param _payees the list of payee of the expense. The payer can be part of the payees.
    function addExpense(
        string memory _title,
        uint256 _amount,
        uint256 _valueDate,
        address[] memory _payees
    ) public restrictedToMember {
        address _payer = msg.sender;
        require(_amount > 0);
        require(_payees.length > 0 && _payees.length <= MAX_PAYEES);
        require(isMember(_payer));
        require(areAllMembers(_payees));
        require(areAllAddressesUnique(_payees));

        /// NOTE: Expense contains a mapping 'approvals' and data location needs to be storage.
        Expense storage expense = expenses[numExpenses++];

        expense.name = _title;
        expense.amount = _amount;
        expense.valueDate = _valueDate;
        expense.payer = _payer;
        expense.creationDate = block.timestamp;
        expense.payees = _payees;
    }

    /// @notice Set member's approval for an expense. Each member has 4 weeks to set its approval.
    /// @param _expenseId the identifier of the expense.
    /// @param _approved the approval of the member : true of false.
    function approve(uint256 _expenseId, bool _approved) public restrictedToMember {
        Expense storage expense = expenses[_expenseId];
        require(block.timestamp < expense.creationDate + 4 weeks);
        require(expense.approvals[msg.sender] != _approved);

        uint256 numberOfApprovalsBefore = getNumberOfApprovals(_expenseId);
        
        /// If the number of approvals before the call is not 0, we revert the balance to the previous state without the expense.
        if (numberOfApprovalsBefore != 0) {
            removeFromBalance(_expenseId);
        }

        /// Update the number of approvals
        expense.approvals[msg.sender] = _approved;

        uint256 numberOfApprovalsAfter = getNumberOfApprovals(_expenseId);

        /// If the number of approvals after is not 0, we syncrohonize the balance.
        if (numberOfApprovalsAfter != 0) {
            addToBalance(_expenseId);
        }
    }

    /// @notice Create a Payment. Use this payable function send money to the smart contract.
    /// @param _title the title of the payment
    /// @param _payee the payee of the payment
    function addPayment(string memory _title, address _payee)
        public
        payable
        restrictedToMember
    {
        address _payer = msg.sender;
        require(msg.value > 0);
        require(_payee != _payer);
        require(isMember(_payer));
        require(isMember(_payee));

        Payment memory payment = Payment({
            title: _title,
            amount: msg.value,
            valueDate: block.timestamp,
            payer: _payer,
            payee: _payee
        });

        payments.push(payment);
        withdrawals[_payee] += msg.value;
        synchronizeBalanceAfterPayment(payment);
    }

    /// @notice Allow each user to withdraw its money from the smart contract
    function withdraw() public restrictedToMember {
        require(withdrawals[msg.sender] > 0);
        uint256 amount = withdrawals[msg.sender];
        withdrawals[msg.sender] = 0;

        (bool success, ) = msg.sender.call{value: amount}("");

        require(success);
    }

    /// @notice Get the max of all balances.
    /// @return (max, index) where max is the max of all the balance and index is the index of the member.
    function getMaxBalance() public view returns (int256, uint256) {
        int256 max = members[memberAddresses[0]].balance;
        uint256 index = 0;
        for (uint256 i = 1; i < memberAddresses.length; i++) {
            if (max != getMax(max, members[memberAddresses[i]].balance)) {
                max = members[memberAddresses[i]].balance;
                index = i;
            }
        }
        return (max, index);
    }

    /// @notice Get withdrawal per address
    /// @return the available withdrawal for the member address
    function getWithdrawal(address _memberAddress) public view returns (uint256) {
        return withdrawals[_memberAddress];
    }

    /// @notice Get approval depending on the expense identifier and address of the member.
    /// @param _expenseId the index of the expense
    /// @param _memberAddress address of the payee
    /// @return true if payee gave is approval, else false
    function getApproval(uint256 _expenseId, address _memberAddress)
        public
        view
        returns (bool)
    {
        return expenses[_expenseId].approvals[_memberAddress];
    }

    /// @notice Get the total number of approvals for a given expense.
    /// @param _expenseId the index of the expense
    /// @return the number of approvals
    function getNumberOfApprovals(uint256 _expenseId)
        public
        view
        returns (uint256)
    {
        Expense storage expense = expenses[_expenseId];
        uint256 numberOfApprovals = 0;
        for (uint256 i = 0; i < expense.payees.length; i++) {
            if (expense.approvals[expense.payees[i]] == true) {
                numberOfApprovals++;
            }
        }
        return numberOfApprovals;
    }

    /// @notice Get the balance of a member.
    /// @param _memberAddress the address of the member
    /// @return the balance of the member
    function getBalance(address _memberAddress) public view returns (int256) {
        return members[_memberAddress].balance;
    }

    /// @notice Get the name of a member.
    /// @param _memberAddress the address of the member
    /// @return the name of the member
    function getMemberName(address _memberAddress)
        public
        view
        returns (string memory)
    {
        return members[_memberAddress].name;
    }

    /// @notice Check if there is duplicate inside array.
    /// @param _list the list of address to check
    /// @return true if there is duplicate, false otherwise
    function areAllAddressesUnique(address[] memory _list)
        internal
        pure
        returns (bool)
    {
        uint256 counter;
        for (uint256 i = 0; i < _list.length; i++) {
            counter = 0;
            address addr = _list[i];
            for (uint256 j = 0; j < _list.length; j++) {
                if (addr == _list[j]) {
                    counter++;
                }
                if (counter == 2) {
                    return false;
                }
            }
        }
        
        return true;
    }

    /// @notice Check if each address of the list is registered as member.
    /// @param _list the list of address to check
    /// @return true if all the list is registred as member, false otherwise
    function areAllMembers(address[] memory _list) internal view returns (bool) {
        for (uint256 i = 0; i < _list.length; i++) {
            if (!isMember(_list[i])) {
                return false;
            }
        }
        return true;
    }

    /// @notice Check if each address of the list is registered as amember.
    /// @param _memberAddress the address to check
    /// @return true if all the list is registred as member, false otherwise
    function isMember(address _memberAddress) internal view returns (bool) {
        if (_memberAddress == members[_memberAddress].memberAddress) {
            return true;
        } else {
            return false;
        }
    }

    /// @notice Add the expense amount to the balance if there is some approval
    /// @dev This function must be use if there is at list one approval in the expense
    /// @param expenseId the index of the expense
    function addToBalance(uint256 expenseId) internal {
        calculateBalance(expenseId, false);
    }

    /// @notice Remove the expense amount from the balance if there is no approval
    /// @dev This function must not be use if there is zero approval
    /// @param expenseId the index of the expense
    function removeFromBalance(uint256 expenseId) internal {
        calculateBalance(expenseId, true);
    }

    /// @notice Calculate the balance after each approval / unapproval.
    /// @param _expenseId the index of the expense
    /// @param _isRemoved indicate if the expense must be reverted or synchronized
    function calculateBalance(uint256 _expenseId, bool _isRemoved) internal {
        uint256 contributors = getNumberOfApprovals(_expenseId);
        require(contributors > 0);
        Expense storage expense = expenses[_expenseId];
        int256 _portion = int256(expense.amount / contributors);
        int256 _amount = int256(expense.amount);

        if (_isRemoved) {
            _portion = -(_portion);
            _amount = -(_amount);
        }

        members[expense.payer].balance += _amount;
        for (uint256 i = 0; i < expense.payees.length; i++) {
            if (expense.approvals[expense.payees[i]]) {
                members[expense.payees[i]].balance -= _portion;
            }
        }
    }

    /// @notice Calculate the state of the balance after each new payement.
    /// @param payment which will alter balance
    function synchronizeBalanceAfterPayment(Payment memory payment) internal {
        members[payment.payee].balance -= int256(payment.amount);
        members[payment.payer].balance += int256(payment.amount);
    }

    function getMax(int256 a, int256 b) internal pure returns (int256) {
        return a >= b ? a : b;
    }

    function getMin(int256 a, int256 b) internal pure returns (int256) {
        return a < b ? a : b;
    }
}
