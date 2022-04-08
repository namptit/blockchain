const TCBSToken = artifacts.require("TCBSToken");
const TokenSwap = artifacts.require("TokenSwap");

var chai = require("chai");

const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("TCBSToken", accounts => {
    /*it('should valid init balance', async function () {
        let tcbsToken = await TCBSToken.deployed();

        let bnBalance = await tcbsToken.balanceOf(accounts[9]);

        let balance = web3.utils.fromWei(bnBalance);

        //await expect(tcbToken.balanceOf(accounts[8])).to.eventually.be.a.bignumber.equal(totalSupply);
        assert.equal(balance, 10);
    });

    it ('send fully token to other account', async function (){
        let tcbsToken = await TCBSToken.deployed();

        const sendTokens = '1';
        console.log(web3.utils.toWei(sendTokens));

        let transfer = tcbsToken.transfer(accounts[7], web3.utils.toWei(sendTokens));

        await expect(transfer).to.eventually.be.fulfilled;
    });*/

    /*it ('init pool TcbsToken', async function () {
        let tokenSwap = await TokenSwap.deployed();
        let tcbsToken = await TCBSToken.deployed();

        let transfer = tcbsToken.transfer(tokenSwap.address, web3.utils.toWei('50'));
        await expect(transfer).to.eventually.be.fulfilled;
    });*/
});
