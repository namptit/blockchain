const TCBToken = artifacts.require("TCBToken");
const TCBSToken = artifacts.require("TCBSToken");
const TokenSwap = artifacts.require("TokenSwap");

module.exports = function (deployer) {
  deployer.deploy(TokenSwap);
  deployer.deploy(TCBToken);
  deployer.deploy(TCBSToken);
};
