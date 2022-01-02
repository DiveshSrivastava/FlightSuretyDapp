var HDWalletProvider = require("truffle-hdwallet-provider");
var mnemonic = "layer such smile teach shove open rifle genius indicate bright panda leader";

module.exports = {
  networks: {

    development: {
      provider: function() {
        return new HDWalletProvider(mnemonic, "http://127.0.0.1:9545/", 0, 50);
      },      
      network_id: '*',
      gas: 4500000,
      gasPrice: 1000000,
    },

    rinkeby: {
      provider: () => new HDWalletProvider(mnemonic, `https://rinkeby.infura.io/v3/f246054afe774a8cb65f975c6886ef4a`),
      network_id: 4,       // rinkeby's id
      gas: 4500000,        // rinkeby has a lower block limit than mainnet
      gasPrice: 21000000000,
      networkCheckTimeout: 1000000
    },

  },
  compilers: {
    solc: {
      version: "^0.4.24"
    }
  }
};