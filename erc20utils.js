const ethers = require('ethers');
const fs = require('fs');
const {getContract} = require('./utils.js')

async function approveToken(wallet, tokenAddress, spender, approveValue) {
    const tokenABI = JSON.parse(fs.readFileSync('./ABI/erc20.json'));
    const tokenContract = new ethers.Contract(tokenAddress, tokenABI, wallet);
    const txApprove = await tokenContract.approve(spender, approveValue);
    return await txApprove.wait();
};

const fetchToken = async(tokenAddr, wallet) => {
    const tokenABI = JSON.parse(fs.readFileSync('./ABI/erc20.json'));
    const contract = getContract(tokenABI, tokenAddr, wallet);
    const decimal = Number(await contract.decimals());
    const symbol = await contract.symbol();
    const name = await contract.name();
    const tokenInfo = {
        name,
        symbol,
        // chainId: chain.id,
        decimal,
        // icon: '/assets/tokens/default.svg',
        custom: true,
        address: tokenAddr
    };
    return tokenInfo;
};


module.exports = {
    approveToken,
    fetchToken
};
