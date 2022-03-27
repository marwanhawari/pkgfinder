import PackageCard from "./PackageCard";
import {PackagesType} from "./types";

export default function Packages({packages}: {packages: PackagesType[]}) {
    return (
        <div id="pkgs">
            {packages.map((currentPackage) => {
                return (
                    <PackageCard
                        key={currentPackage.id}
                        currentPackage={currentPackage}
                    />
                );
            })}
        </div>
    );
}
