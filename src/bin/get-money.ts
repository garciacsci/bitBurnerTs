import { NS } from "Bitburner";

export async function main(ns: NS) {
    if (typeof ns.args[0] !== 'string') {
        ns.tprint("Error: First argument must be a string.");
        return;
    }
    const target: string = ns.args[0];

    const securityLevel = ns.getServerSecurityLevel(target);
    const secruityThresh = ns.getServerMinSecurityLevel(target) + 5;

    const moneyLevel = ns.getServerMoneyAvailable(target);
    const moneyThresh = ns.getServerMaxMoney(target) * 0.75;

    while (true) {
        if (securityLevel > secruityThresh) {
            await ns.weaken(target); 
        } else if (moneyLevel < moneyThresh) {
            await ns.grow(target);
        } else {
            await ns.hack(target);
        }
    }
}