const {Resolver} = require("dns").promises;
const resolver = new Resolver();

function timeout(ms) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("DNS query timed out. TLD likely registered");
        }, ms);
    });
}

async function checkDomain(domainName, TLD) {
    let known;
    try {
        known = await Promise.race([
            timeout(1000),
            resolver.resolve(`${domainName}.${TLD}`, "NS"),
        ]);
    } catch (error) {
        if (error.code == "ESERVFAIL") {
            known = "Already registered";
        } else {
            known = null;
        }
    }
    return known;
}

module.exports = {
    checkDomain,
};
