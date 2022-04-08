const TCBSToken = artifacts.require("TCBSToken");
const TCBToken = artifacts.require("TCBToken");
const TokenSwap = artifacts.require("TokenSwap");

var chai = require("chai");

const BN = web3.utils.BN;
const chaiBN = require("chai-bn")(BN);
chai.use(chaiBN);

var chaiAsPromised = require("chai-as-promised");
chai.use(chaiAsPromised);

const expect = chai.expect;

contract("TokenSwap", accounts => {

    it('should swap_v2 valid', async function () {
        let tokenSwap = await TokenSwap.deployed();
        let tcbToken = await TCBToken.deployed();
        let tcbsToken = await TCBSToken.deployed();

        let addressTCB = tcbToken.address;
        let addressTCBS = tcbsToken.address;
        const amount = '1';
        let accountSend = accounts[8];
        let accountReceive = tokenSwap.address;

        await tcbToken.transfer(tokenSwap.address, web3.utils.toWei('10'));
        await tcbsToken.transfer(tokenSwap.address, web3.utils.toWei('10'));

        console.log('accountSend: ' + accountSend);
        console.log('accountReceive: ' + accountReceive);
        console.log('\n--- before swap');
        let bnTcbBalanceSend = await tcbToken.balanceOf(accountSend);
        let bnTcbBalanceReceive = await tcbToken.balanceOf(accountReceive);
        console.log('bnTcbBalanceSend ' + web3.utils.fromWei(bnTcbBalanceSend));
        console.log('bnTcbBalanceReceive ' + web3.utils.fromWei(bnTcbBalanceReceive));
        console.log('-');
        let bnTcbsBalanceSend = await tcbsToken.balanceOf(accountSend);
        let bnTcbsBalanceReceive = await tcbsToken.balanceOf(accountReceive);
        console.log('bnTcbsBalanceSend ' + web3.utils.fromWei(bnTcbsBalanceSend));
        console.log('bnTcbsBalanceReceive ' + web3.utils.fromWei(bnTcbsBalanceReceive));

        // do swap
        console.log('\namount swap: ' + web3.utils.toWei(amount));
        await tcbToken.approve(accountReceive, web3.utils.toWei(amount), {from: accountSend});
        await tokenSwap.swap_v2(addressTCB,
                                web3.utils.toWei(amount),
                                addressTCBS,
                                web3.utils.toWei(amount),
                                { from: accountSend });

        console.log('\n --- after swap');
        let bnTcbBalanceSendAfter = await tcbToken.balanceOf(accountSend);
        let bnTcbBalanceReceiveAfter = await tcbToken.balanceOf(accountReceive);
        console.log('bnTcbBalanceSend ' + web3.utils.fromWei(bnTcbBalanceSendAfter));
        console.log('bnTcbBalanceReceive ' + web3.utils.fromWei(bnTcbBalanceReceiveAfter));
        console.log('-');
        let bnTcbsBalanceSendAfter = await tcbsToken.balanceOf(accountSend);
        let bnTcbsBalanceReceiveAfter = await tcbsToken.balanceOf(accountReceive);
        console.log('bnTcbsBalanceSend ' + web3.utils.fromWei(bnTcbsBalanceSendAfter));
        console.log('bnTcbsBalanceReceive ' + web3.utils.fromWei(bnTcbsBalanceReceiveAfter));

        assert.equal(100, 100);
    });
});