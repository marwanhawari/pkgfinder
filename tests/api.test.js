const request = require("supertest");
const {app} = require("../api/main.js");

describe("test / endpoint", () => {
    test("test /", async () => {
        let endpoint = "/";
        const res = await request(app).get(endpoint);
        expect(res.statusCode).toEqual(200);
        expect(res.headers["content-type"]).toEqual(
            "application/json; charset=utf-8"
        );
        expect(res.body.message).toBe(
            "Use the /:searchQuery endpoint to access the pkgfinder API"
        );
    });
});

describe("test /:searchQuery param", () => {
    test("test /wget", async () => {
        let endpoint = "/wget";
        const res = await request(app).get(endpoint);
        expect(res.statusCode).toEqual(200);
        expect(res.body.brewCore.author).toBe("homebrew/core");
        expect(res.body.brewCask).toBeNull();
    });

    test("test /slack", async () => {
        let endpoint = "/slack";
        const res = await request(app).get(endpoint);
        expect(res.statusCode).toEqual(200);
        expect(res.body.brewCask.author).toBe("homebrew/cask");
        expect(res.body.brewCore).toBeNull();
    });

    test("test /marwan", async () => {
        let endpoint = "/marwan";
        const res = await request(app).get(endpoint);
        expect(res.statusCode).toEqual(200);
        expect(res.body.pypi.author).toBe("Marwan Hawari");
        expect(res.body.npm).toBeNull();
        expect(res.body.com).toBeNull();
    });

    test("test /reqwest", async () => {
        let endpoint = "/reqwest";
        const res = await request(app).get(endpoint);
        expect(res.statusCode).toEqual(200);
        expect(res.body.crates.author).toBe("Sean McArthur");
        expect(res.body.com).toBeNull();
    });

    test("test /express", async () => {
        let endpoint = "/express";
        const res = await request(app).get(endpoint);
        expect(res.statusCode).toEqual(200);
        expect(res.body.npm.url).toBe("https://www.npmjs.com/package/express");
        expect(res.body.crates.author).toBe(undefined);
        expect(res.body.com).toBeNull();
    });

    test("test /rails", async () => {
        let endpoint = "/rails";
        const res = await request(app).get(endpoint);
        expect(res.statusCode).toEqual(200);
        expect(res.body.crates).toBeNull();
        expect(res.body.crates?.url).toBe(undefined);
        expect(res.body.gems.name).toBe("rails");
    });
});
