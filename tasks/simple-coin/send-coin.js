const util = require("util");
const request = util.promisify(require("request"));

task("send-coin", "Sends SimpleCoin")
.addParam("tokenaddress", "The Token address address")
.addParam("kangarooaddress", "The Kangaroo address")
.addParam("fromaddress", "The Kangaroo address")
.setAction(async (taskArgs) => {
    const tokenAddress = taskArgs.tokenaddress;
    const kangarooAddress = taskArgs.kangarooaddress;
    const networkId = network.name
    const Kangaroo = await ethers.getContractFactory("Kangaroo")
    const KDCoin = await ethers.getContractFactory("KDCoin")
    //Get signer information
    const accounts = await ethers.getSigners()
    const signer = accounts[0]
    const priorityFee = await callRpc("eth_maxPriorityFeePerGas")
    const fromAddr = taskArgs.fromaddress;

    async function callRpc(method, params) {
        var options = {
          method: "POST",
          url: "https://wallaby.node.glif.io/rpc/v0",
          // url: "http://localhost:1234/rpc/v0",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            jsonrpc: "2.0",
            method: method,
            params: params,
            id: 1,
          }),
        };
        const res = await request(options);
        return JSON.parse(res.body).result;
      }

    const kdCoinContract = new ethers.Contract(tokenAddress, KDCoin.interface, signer)
    const kangarooContract = new ethers.Contract(kangarooAddress, Kangaroo.interface, signer)
    const res = await kangarooContract.createKangaroo(fromAddr, {
        gasLimit: 1000000000,
        maxPriorityFeePerGas: priorityFee
    });
    console.log(res);
    // console.log("Sending:", amount, "SimpleCoin to", toAccount)
    // await kdCoinContract.sendCoin(toAccount, amount, {
    //     gasLimit: 1000000000,
    //     maxPriorityFeePerGas: priorityFee
    // })
    let result = BigInt(await kdCoinContract.getBalance(kangarooAddress)).toString()
    let bal2 = BigInt(await kdCoinContract.getBalance(fromAddr)).toString()
    console.log("FROM: ", bal2.toString())
    console.log("TO (SC)", result.toString())
})

module.exports = {}