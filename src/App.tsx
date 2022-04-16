import {useState, useRef} from "react";
import axios from "axios";
import Packages from "./Packages";
import Domains from "./Domains";
import {DomainsType, PackagesType} from "./types";

async function getResponse(url: string) {
    try {
        let response = await axios.get(url);
        return response;
    } catch (error) {
        return undefined;
    }
}

export default function App() {
    let defaultPackages: PackagesType[] = [
        {id: "brewCask", title: "Homebrew Cask"},
        {id: "brewCore", title: "Homebrew Core"},
        {id: "pypi", title: "PyPI"},
        {id: "npm", title: "npm"},
        {id: "crates", title: "crates.io"},
        {id: "gems", title: "RubyGems"},
    ];

    let defaultDomains: DomainsType[] = [
        {id: "com"},
        {id: "org"},
        {id: "net"},
        {id: "io"},
        {id: "dev"},
        {id: "app"},
    ];

    let defaultLoaderStyle = {
        display: "none",
    };

    const [packages, setPackages] = useState<PackagesType[]>(defaultPackages);
    const [domains, setDomains] = useState<DomainsType[]>(defaultDomains);
    const [loaderStyle, setloaderStyle] = useState(defaultLoaderStyle);

    const loaderRef = useRef<HTMLDivElement>(null);
    const searchBarRef = useRef<HTMLInputElement>(null);

    function handleInput() {
        let searchQuery;
        if (searchBarRef.current != null) {
            searchQuery = searchBarRef.current.value;
            if (searchQuery.includes(" ")) {
                searchBarRef.current.value = searchQuery.replace(/\s/g, "");
            }
        }
    }

    async function handleSubmit(event: any) {
        event.preventDefault();

        if (loaderRef.current != null) {
            setloaderStyle({
                display: "block",
            });
        }

        // Get the search query
        let searchQuery;
        if (searchBarRef.current != null) {
            searchQuery = searchBarRef.current.value;
        }

        let apiBaseURL =
            import.meta.env.VITE_API_URL || `https://api.pkgfinder.org`;

        let apiURL = `${apiBaseURL}/${searchQuery}`;

        // Make the async HTTP request
        let apiResponse = await getResponse(apiURL);
        if (!apiResponse) {
            apiResponse = {
                config: {},
                headers: {},
                status: 500,
                statusText: "Could not retrieve response from the server!",
                data: {},
            };
            setPackages(defaultPackages);
            setDomains(defaultDomains);
        }

        let packageOptions = defaultPackages.map((obj) => {
            return obj.id;
        });
        let domainOptions = defaultDomains.map((obj) => {
            return obj.id;
        });

        if (loaderRef.current != null) {
            setloaderStyle({
                display: "none",
            });
        }

        // Modify the state
        let id: string;
        let info: any;
        for ([id, info] of Object.entries(apiResponse.data)) {
            if (packageOptions.includes(id)) {
                setPackages((prevPackages) => {
                    return [
                        ...prevPackages.slice(1),
                        {
                            id: id,
                            title: prevPackages[0].title,
                            name: info ? info.name : null,
                            author: info ? info.author : null,
                            description: info ? info.description : null,
                            url: info ? info.url : null,
                        },
                    ];
                });
            } else if (domainOptions.includes(id)) {
                setDomains((prevDomains) => {
                    return [
                        ...prevDomains.slice(1),
                        {
                            id: id,
                            available: info ? info : null,
                        },
                    ];
                });
            }
        }

        if (searchBarRef.current != null) {
            searchBarRef.current.value = "";
        }
    }

    return (
        <div className="body-content">
            <div className="container" id="title-container">
                <h1 id="title">pkgfinder</h1>
            </div>
            <form id="form" onSubmit={handleSubmit}>
                <input
                    type="text"
                    name="search"
                    id="search"
                    autoComplete="off"
                    placeholder="Search"
                    ref={searchBarRef}
                    onInput={handleInput}
                />
                <div
                    className="loader"
                    style={loaderStyle}
                    ref={loaderRef}
                ></div>
            </form>

            <div id="main-content">
                <h3 className="label">Package Registries</h3>
                <Packages packages={packages} />
                <h3 className="label">Domains</h3>
                <Domains domains={domains} />
            </div>
        </div>
    );
}
