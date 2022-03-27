import DomainCard from "./DomainCard";
import {DomainsType} from "./types";

export default function Domains({domains}: {domains: DomainsType[]}) {
    return (
        <div id="domains">
            {domains.map((currentDomain) => {
                return (
                    <DomainCard
                        key={currentDomain.id}
                        currentDomain={currentDomain}
                    />
                );
            })}
        </div>
    );
}
