const util = require("util");
const request = util.promisify(require("request"));

task("get-balance", "Calls the simple coin Contract to read the amount of SimpleCoins owned by the account.")
  .addParam("contract", "The address the SimpleCoin contract")
  .addParam("account", "The address of the account you want the balance for")
  .setAction(async (taskArgs) => {
    const contractAddr = taskArgs.contract
    const account = taskArgs.account
    const networkId = network.name
    console.log("Reading KD owned by", account, " on network ", networkId)

    //Get signer information
    const accounts = await ethers.getSigners()
    const signer = accounts[0]


    const SimpleCoin = await ethers.getContractFactory("KDCoin")
    const simpleCoinContract = new ethers.Contract(contractAddr, SimpleCoin.interface, signer)
    let result = BigInt(await simpleCoinContract.getBalance(account)).toString()
    console.log("Data is: ", result)
  })

  task("setup", "Setup the scs").addParam("tokenaddress", "").addParam("kangarooaddress", "").addParam("kf", "").setAction(async(taskArgs) => {
    const tokenAddress = taskArgs.tokenaddress; 
    const kangarooAddress = taskArgs.kangarooaddress;
    const kfAddress = taskArgs.kf;
    const accounts = await ethers.getSigners()
    const signer = accounts[0]

    const KangarooFactory = await ethers.getContractFactory("KangarooFactory")
    const kfContract = new ethers.Contract(kfAddress, KangarooFactory.interface, signer);

    const KDCoin = await ethers.getContractFactory("KDCoin")
    const kdCoinContract = new ethers.Contract(tokenAddress, KDCoin.interface, signer);

    const kangaroo = await ethers.getContractFactory("Kangaroo")
    const kangarooContract = new ethers.Contract(kangarooAddress, kangaroo.interface, signer);

    const priorityFee = await callRpc("eth_maxPriorityFeePerGas")

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

    const res = await kfContract.createKangaroo({
        gasLimit: 1000000000,
        maxPriorityFeePerGas: priorityFee
    });
    console.log(res)
    const res2 = await kfContract.allFoundations();
    console.log(res2)

    // await kangarooContract.setToken(tokenAddress);
  })
  // Token Adress - 0xc2C86C80fd45A7B18D37a8cf9B8D77b47e520056
  // Kangaroo - 0x6b737A53e6C631847102CDcd9AA5e3546fDcc900
  // KF - 0xdCc106447cE2ac2DB24eb10fE257dd57D89Ae9d3

  /**
   * 
   * yarn hardhat send-coin --tokenaddress "0xC333AE0158B7B2b4120d98F86d95af3b377ce97E" --kangarooaddress "0x8D5e057B957cc16d6880D5B467D7F7BcbdB03Cac" --fromaddress "0xE1cD0998e7Bc2171D6aE0D15Bf2d6715F0c695BF"
   */

module.exports = {}