import {DomainsType} from "./types";

export default function DomainCard({
    currentDomain,
}: {
    currentDomain: DomainsType;
}) {
    return (
        <div
            className={!currentDomain.available ? "domain inactive" : "domain"}
            id={currentDomain.id}
        >
            <div className="pkg-id">.{currentDomain.id}</div>
            <div className="domain-status">
                {currentDomain.available ? "Available" : ""}
            </div>
        </div>
    );
}
