const path = require('path')

const HDWalletProvider = require('@truffle/hdwallet-provider');
const infuraRinkebyURL = 'https://rinkeby.infura.io/v3/44920c3d0bbb4f5989962a9d43a1cb288' 
const infuraRopstenURL = 'https://ropsten.infura.io/v3/44920c3d0bbb4f5989962a9d43a1cb28' 

const fs = require('fs');
const mnemonic = fs.readFileSync(".secret").toString().trim();

module.exports = {
  // See <http://truffleframework.com/docs/advanced/configuration>
  // to customize your Truffle configuration!

  compilers: {
    solc: {
      version: '^0.8.0', // Fetch exact version from solc-bin (default: truffle's version)
      optimizer: {
        enabled: true,
        runs: 200,
      }
    },
  },
  contracts_build_directory: path.join(__dirname, 'client/src/contracts'),
  networks: {
    development: {
      host: 'localhost',
      port: 8545,
      network_id: '*'
    },
    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, infuraRinkebyURL),
      network_id: 4,
      gas: 5500000,        
    },
    ropsten: {
      provider: () => new HDWalletProvider(mnemonic, infuraRopstenURL),
      network_id: 3,
      gas: 5500000,        
    }    
  },
}
