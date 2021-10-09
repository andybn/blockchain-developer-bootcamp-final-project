const path = require('path')

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
  },
}
