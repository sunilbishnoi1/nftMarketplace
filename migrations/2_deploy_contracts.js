const Aurora = artifacts.require('Aurora')

module.exports = async (deployer) => {
  const accounts = await web3.eth.getAccounts()

  await deployer.deploy(Aurora, 'Aurora NFTs', 'ANT', 10, accounts[0])
}