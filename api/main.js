const express = require("express");
const cors = require("cors");
var helmet = require("helmet");
const {Package} = require("./modules/package.js");
const {checkDomain} = require("./modules/domains.js");
const {getResponse} = require("./modules/util.js");

const app = express();
app.use(cors());
app.use(helmet());

app.get("/", (req, res) => {
    res.json({
        message: "Use the /:searchQuery endpoint to access the pkgfinder API",
    });
});

app.get("/:searchQuery", async (req, res) => {
    let searchQuery = req.params.searchQuery;

    // Define the API endpoints
    let brewCaskURL = `https://formulae.brew.sh/api/cask/${searchQuery}.json`;
    let brewCoreURL = `https://formulae.brew.sh/api/formula/${searchQuery}.json`;
    let pypiURL = `https://pypi.org/pypi/${searchQuery}/json`;
    let npmURL = `https://registry.npmjs.org/${searchQuery}`;
    let cratesURL = `https://crates.io/api/v1/crates/${searchQuery}`;
    let gemsURL = `https://rubygems.org/api/v1/gems/${searchQuery}.json`;

    // Make the async HTTP requests
    let [
        brewCaskRes,
        brewCoreRes,
        pypiRes,
        npmRes,
        cratesRes,
        gemsRes,
        comRes,
        orgRes,
        netRes,
        ioRes,
        devRes,
        appRes,
    ] = await Promise.all([
        getResponse(brewCaskURL),
        getResponse(brewCoreURL),
        getResponse(pypiURL),
        getResponse(npmURL),
        getResponse(cratesURL),
        getResponse(gemsURL),
        checkDomain(searchQuery, "com"),
        checkDomain(searchQuery, "org"),
        checkDomain(searchQuery, "net"),
        checkDomain(searchQuery, "io"),
        checkDomain(searchQuery, "dev"),
        checkDomain(searchQuery, "app"),
    ]);

    // Map the domain to its contents
    let responsesMap = {
        brewCask: brewCaskRes,
        brewCore: brewCoreRes,
        pypi: pypiRes,
        npm: npmRes,
        crates: cratesRes,
        gems: gemsRes,
        com: comRes,
        org: orgRes,
        net: netRes,
        io: ioRes,
        dev: devRes,
        app: appRes,
    };

    let packages = new Set([
        "brewCask",
        "brewCore",
        "pypi",
        "npm",
        "crates",
        "gems",
    ]);
    let websites = new Set(["com", "org", "net", "io", "dev", "app"]);

    let responseToSend = {};
    for (let [id, response] of Object.entries(responsesMap)) {
        if (packages.has(id) && response) {
            let pkg = new Package(id, response);
            responseToSend[id] = pkg.info;
        } else if (websites.has(id)) {
            if (response) {
                responseToSend[id] = null;
            } else {
                responseToSend[id] = "Available";
            }
        } else {
            responseToSend[id] = null;
        }
    }

    res.json(responseToSend);
});

module.exports = {
    app,
};
