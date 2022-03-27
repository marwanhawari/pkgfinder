import {PackagesType} from "./types";

export default function PackageCard({
    currentPackage,
}: {
    currentPackage: PackagesType;
}) {
    return (
        <div
            className={!currentPackage.name ? "pkg inactive" : "pkg"}
            id={currentPackage.id}
        >
            <div className="pkg-id">{currentPackage.title}</div>
            {currentPackage.name && (
                <div className="pkg-contents">
                    {currentPackage.name && (
                        <div className="pkg-name">
                            <b>Name:</b> {currentPackage.name}
                        </div>
                    )}
                    {currentPackage.author && (
                        <div className="pkg-author">
                            <b>Author:</b> {currentPackage.author}
                        </div>
                    )}
                    {currentPackage.description && (
                        <div className="pkg-description">
                            <b>Description:</b> {currentPackage.description}
                        </div>
                    )}
                </div>
            )}
            {currentPackage.name && (
                <a
                    href={currentPackage.url}
                    className="material-icons pkg-link"
                    rel="noopener noreferrer"
                    target={"_blank"}
                >
                    open_in_new
                </a>
            )}
        </div>
    );
}
