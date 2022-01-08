const axios = require("axios");
async function getResponse(url) {
    try {
        let response = await axios.get(url);
        return response;
    } catch (error) {
        return undefined;
    }
}

module.exports = {
    getResponse,
};
