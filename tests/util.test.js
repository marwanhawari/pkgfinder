const {getResponse} = require("../api/modules/util.js");

test("test getResponse function", async () => {
    let url = `https://pypi.org/pypi/marwan/json`;
    let response = await getResponse(url);
    expect(response.data.info.author).toBe("Marwan Hawari");
});
