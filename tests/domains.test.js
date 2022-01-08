const {checkDomain} = require("../api/modules/domains.js");

test("test checkDomain truthy", async () => {
    let testTruthy = await checkDomain("marwanhawari", "com");
    expect(testTruthy).toBeTruthy();
});

test("test checkDomain null", async () => {
    let testFalsy = await checkDomain("marwanhawari", "org");
    expect(testFalsy).toBeNull();
});
