--------------------------------------------------------------------------Flight Surety Application---------------------------------------------------------------------------

Flight Surety is a flight delay insurance Dapp with multiple smart contracts which are autonomously triggered by external sources, and which handle payments based on flight delay scenarios.

------------------------------------------------------------------------------Introduction------------------------------------------------------------------------------------

The goal of this project is to build a dApp (Decentralized application) using smart contracts and web3 technology. This project tackles these specific points:
1) Multi-party consensus
2) Oracles
3) Receive, transfer and send funds
4)Smart Contract upgradability
5)Fail fast contracts

In this app a passenger can:
1) Subscribe insurance to a flight
2) If the flight is delayed due to the company the passenger will get 1.5x the amount of ether he put in the insurance
3) The passenger can withdraw the ether from the smart contract

For airlines, the smart contract allows to:
1) Submit a new airline to the smart contract
2) Vote for a new airline to reach a 50% consensus


We have a server that simulates the behavior of oracles that:
1) Listen to a specific event that the smart contract will trigger when info about a flight is needed
2) Generate the info about flights and send them to the smart contract

------------------------------------------------------------------------------Prerequisites--------------------------------------------------------------------------------

Before running the Flight Surety project make sure the following dependencies are installed:
Node v11.12.0
Solidity  v0.4.24
Truffle  v4.1.14
Web3.js
Ganache 

------------------------------------------------------------------------------Getting Started------------------------------------------------------------------------------

1) Install dependencies using npm:
    > `npm install`
2) Setup Metamask and configure a local network using the following settings:
    >Network Name: Localhost 7545
    >RPC URL: http://localhost:7545
    >Chain ID: 1337
3) Store the Metamask mnemonic in the root of the project in a file called .secret.
4) Start ganache-UI with 50 accounts
5) Use truffle framework to test 
    >`truffle compile`
    >`truffle test ./test/flightSurety.js`
    >`truffle test ./test/oracles.js`
6) Migrate app to development 
    >`truffle migrate --network development`
7) The front-end application (Dapp) can be started using the following npm command in a separate terminal:
    >`npm run dapp`
8) The back-end server (oracles and API) can be started using the following npm command in a separate terminal:
    >`npm run server`
9) To interact with the smart contract and Dapp open http://localhost:8000/ in a browser with the Metamask extension installed and configured for the local blockchain.

--------------------------------------------------------------------------------Resources---------------------------------------------------------------------------------

* [How does Ethereum work anyway?](https://medium.com/@preethikasireddy/how-does-ethereum-work-anyway-22d1df506369)
* [BIP39 Mnemonic Generator](https://iancoleman.io/bip39/)
* [Truffle Framework](http://truffleframework.com/)
* [Ganache Local Blockchain](http://truffleframework.com/ganache/)
* [Remix Solidity IDE](https://remix.ethereum.org/)
* [Solidity Language Reference](http://solidity.readthedocs.io/en/v0.4.24/)
* [Ethereum Blockchain Explorer](https://etherscan.io/)
* [Web3Js Reference](https://github.com/ethereum/wiki/wiki/JavaScript-API)