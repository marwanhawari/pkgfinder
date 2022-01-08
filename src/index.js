async function getResponse(url) {
    try {
        let response = await axios.get(url);
        return response;
    } catch (error) {
        return undefined;
    }
}

// Input validation
let searchInput = document.querySelector("#search");
searchInput.addEventListener("input", (event) => {
    if (event.target.value.includes(" ")) {
        event.target.value = event.target.value.replace(/\s/g, "");
    }
});

let searchForm = document.querySelector("#form");
searchForm.addEventListener("submit", async (event) => {
    let loader = document.querySelector(".loader");
    loader.style.display = "block";

    event.preventDefault();

    // Get the search query
    let searchBar = document.querySelector("#search");
    let searchQuery = searchBar.value;
    let apiURL = `https://api.pkgfinder.org/${searchQuery}`;
    // Make the async HTTP request
    let apiResponse = await getResponse(apiURL);
    if (!apiResponse) {
        console.error("Could not retrieve response from the server!");
        apiResponse = {
            data: {
                brewCask: null,
                brewCore: null,
                pypi: null,
                npm: null,
                crates: null,
                gems: null,
                com: null,
                org: null,
                net: null,
                io: null,
                dev: null,
                app: null,
            },
        };
    }

    let packages = new Set([
        "brewCask",
        "brewCore",
        "pypi",
        "npm",
        "crates",
        "gems",
    ]);
    let domains = new Set(["com", "org", "net", "io", "dev", "app"]);

    loader.style.display = "none";
    // Modify the HTML
    for (let [id, info] of Object.entries(apiResponse.data)) {
        // Reset card
        let pkgElement = document.querySelector(`#${id}`);
        pkgElement.classList.add("inactive");
        if (packages.has(id)) {
            let pkgContentsElement = pkgElement.querySelector(".pkg-contents");
            pkgContentsElement.innerHTML = "";
            let pkgLinkElement = pkgElement.querySelector(".pkg-link");
            if (pkgLinkElement) {
                pkgLinkElement.remove();
            }
        } else if (domains.has(id)) {
            let pkgContentsElement = pkgElement.querySelector(".domain-status");
            pkgContentsElement.innerHTML = "";
        }

        // Set card
        if (info) {
            pkgElement.classList.remove("inactive");
            if (packages.has(id)) {
                let pkgContentsElement =
                    pkgElement.querySelector(".pkg-contents");

                if (info.name) {
                    let pkgNameElement = document.createElement("div");
                    pkgNameElement.classList.add("pkg-name");
                    pkgNameElement.innerHTML = `<b>Name:</b> ${info.name}`;
                    pkgContentsElement.append(pkgNameElement);
                }

                if (info.author) {
                    let pkgAuthorElement = document.createElement("div");
                    pkgAuthorElement.classList.add("pkg-author");
                    pkgAuthorElement.innerHTML = `<b>Author:</b> ${info.author}`;
                    pkgContentsElement.append(pkgAuthorElement);
                }

                if (info.description) {
                    let pkgDescriptionElement = document.createElement("div");
                    pkgDescriptionElement.classList.add("pkg-description");
                    pkgDescriptionElement.innerHTML = `<b>Description:</b> ${info.description}`;
                    pkgContentsElement.append(pkgDescriptionElement);
                }
                if (info.url) {
                    let pkgLinkElement = document.createElement("a");
                    pkgLinkElement.href = info.url;
                    pkgLinkElement.classList.add("material-icons", "pkg-link");
                    pkgLinkElement.textContent = "open_in_new";
                    pkgLinkElement.rel = "noopener noreferrer";
                    pkgLinkElement.target = "_blank";
                    pkgElement.append(pkgLinkElement);
                }
            } else if (domains.has(id)) {
                pkgElement.querySelector(".domain-status").textContent =
                    "Available";
            }
        }
    }

    searchBar.value = "";
});
