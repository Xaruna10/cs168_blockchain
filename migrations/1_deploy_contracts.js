const schnorr = artifacts.require("Schnorr");
const Mycelia = artifacts.require("Mycelia");
const SimpleStorage = artifacts.require("SimpleStorage");


module.exports = async function(deployer) {
    await deployer.deploy(schnorr);
    const schnr = await schnorr.deployed();

    console.log(schnr.address);
    await deployer.link(schnorr, Mycelia);

    await deployer.deploy(Mycelia, schnr.address);

    const mcelia = await Mycelia.deployed();

    console.log(mcelia.address);

    await deployer.deploy(SimpleStorage, mcelia.address);
};
