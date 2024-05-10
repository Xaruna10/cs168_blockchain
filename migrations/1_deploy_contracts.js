const schnorr = artifacts.require("Schnorr");
const Mycelia = artifacts.require("Mycelia");
const SimpleStorage = artifacts.require("SimpleStorage");
const oracleAddress = "0x02290F7A27127B57ecB5E74F8605322501991491";


module.exports = async function(deployer) {
    await deployer.deploy(schnorr);
    const schnr = await schnorr.deployed();

    console.log(schnr.address);
    await deployer.link(schnorr, Mycelia);

    // await deployer.deploy(Mycelia, schnr.address);
    await deployer.deploy(Mycelia, oracleAddress);


    const mcelia = await Mycelia.deployed();

    console.log(mcelia.address);

    await deployer.deploy(SimpleStorage, mcelia.address);
};
