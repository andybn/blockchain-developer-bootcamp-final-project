
# Bootcamp final project idea

A dapp to share, organize and track expenses with a group of people for an event or any collaborative activity (Similar to Tricount or Splitwise)

## Advantages over centralized app

* Settlement logic is set by public and verifiable code 
* Expenses cannot be easily manipulated 
* It is easy to audit and trace expenses and debts
* Debts can be paid using cryptocurrency (ETH)

## User stories and main scenarios

1. As a creator I want to create a new shared activity
2. As a creator I want to add new user (member)
3. As a user I want to retrieve my current balance
4. As a user I want to add a new expense
5. As a user I want to approve expenses for other users
6. As a user I want to connect Metamask and be aware of account or network changes
7. As a user I want to be able to pause a expense group tracking in case of a disagreement or security issue
8. As a user I want to be able to pay debts using ETH
9. As a user I want to be able to able to withdraw my money

## MVP scope (Bootcamp version)

As part of the initial MVP these features will be included:

Expense group contract development supporting:

- Add new member
- Add new expense
- Approve expense
- Unapprove expense
- Balance tracking
- Pause contract
- Unit tests

Expense group contract factory development supporting:

- Expense group creation
- Expense group list and tracking
- Unit tests

Web3 dapp development supporting:

- Metamask connection 
- Network / account changes detection
- Add new expense group
- View list of expense groups
- View expense group detail including current balance state, expenses and members
- Add new members to a expense group
- Add new expenses to a expense group
- Approve / unapprove expenses
- Bar chart to track member balances
- Provide feedback to the user and error handling when transactions are submitted or confirmed 3 times
  
## MVP+ scope (Future)

- Add new UI components and interactions to process payments / withdrawals
- Add new UI component to be able to pause a concrete expense group contract
- Use hooks and a more modern approach to manage state
- Add component unit tests (Jest)
- Use 'Clone factory pattern' to save gas costs
- Change to upgradeable contracts 
- Explore the usage of L2 solutions to reduce gas costs
## Public hosting

https://godutchsharedexpenses.herokuapp.com/

## Screencast

https://1drv.ms/u/s!Ap8Pj-xmB5iKg-QlL_X52vNWrdemSQ?e=RL2ckJ

## Project structure

Scaffolding based on react-box (React official Truffle box)

* contracts -> ExpenseGroup / ExpenseGroupFactory contracts (Solidity)
* migrations -> Truffle deployment and migrations
* test -> ExpenseGroup / ExpenseGroupFactory unit tests (JS)
* truffle-config.js -> Truffle configuration

* client -> React application (using "Create react app" scaffolding)
* client/src/common -> Common utils
* client/src/component -> Presentational React components
* client/src/container -> Container (and Redux connected) React components
* client/src/contracts -> Contracts ABI related files
* client/src/redux -> Redux related files. Using a Redux flavour (IARS) described in: https://medium.com/blockcentric/how-to-structure-react-redux-applications-53906565a61b

## Project setup

1. Grant execution permissions to Bash scripts
```
chmod u+x bootstrap.sh
chmod u+x server.sh
chmod u+x tests.sh
```
2. Install dependencies (Contract and client)
```
./bootstrap.sh
```
3. Running tests (Contract)
```
./tests.sh
```
4. Start Ganache (for local development and testing)
```
ganache-cli
```
5. Local contract / UI deployment and hosting
```
./server.sh
```

## Technical stack & libraries

* Javascript
* React
* Material UI
* Web3
* Solidity
* Truffle
* Metamask
* OpenZeppelin
* Redux / Reselect
* Recharts
* Formik / Yup
* React router  