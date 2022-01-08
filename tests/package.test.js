const axios = require("axios");
const {Package} = require("../api/modules/package.js");

test("test existing pypi package", async () => {
    let url = `https://pypi.org/pypi/marwan/json`;

    let response = await axios.get(url);
    let pkg = new Package("pypi", response);

    expect(pkg.info.name).toBe("marwan");
    expect(pkg.info.author).toBe("Marwan Hawari");
    expect(pkg.info.description).toBe(
        "Quickly access my important webpages from the command line."
    );
    expect(pkg.info.url).toBe("https://pypi.org/project/marwan");
});
