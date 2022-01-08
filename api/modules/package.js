class Package {
    constructor(id, response) {
        this.id = id;
        this.response = response;
        this.info = this.getInfo(this.id, this.response);
    }

    getInfo(id, response) {
        let info;
        if (id == "brewCask" && response) {
            info = {
                name: response.data.full_token,
                author: response.data.tap,
                description: response.data.desc,
            };
            if (info.name) {
                info.url = `https://formulae.brew.sh/cask/${info.name}`;
            }
        } else if (id == "brewCore" && response) {
            info = {
                name: response.data.full_name,
                author: response.data.tap,
                description: response.data.desc,
            };
            if (info.name) {
                info.url = `https://formulae.brew.sh/formula/${info.name}`;
            }
        } else if (id == "pypi" && response) {
            info = {
                name: response.data.info?.name,
                author: response.data.info?.author,
                description: response.data.info?.summary,
            };
            if (info.name) {
                info.url = `https://pypi.org/project/${info.name}`;
            }
        } else if (id == "npm" && response) {
            info = {
                name: response.data.name,
                author: response.data.author?.name,
                description: response.data.description,
            };
            if (info.name) {
                info.url = `https://www.npmjs.com/package/${info.name}`;
            }
        } else if (id == "crates" && response) {
            info = {
                name: response.data.crate?.name,
                author: response.data.versions[0]?.published_by?.name,
                description: response.data.crate?.description,
            };
            if (info.name) {
                info.url = `https://crates.io/crates/${info.name}`;
            }
        } else if (id == "gems" && response) {
            info = {
                name: response.data.name,
                author: response.data.authors,
                description: response.data.info,
            };
            if (info.name) {
                info.url = `https://rubygems.org/gems/${info.name}`;
            }
        }

        return info;
    }
}

module.exports = {
    Package,
};
