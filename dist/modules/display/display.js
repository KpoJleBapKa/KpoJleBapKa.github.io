"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayClanStats = exports.displayBattleEfficiencyStats = exports.displayMainAccountStats = exports.displayMessage = void 0;
const displayMessage = (message) => {
    const results = document.getElementById("results");
    results.innerHTML = `<p>${message}</p>`;
};
exports.displayMessage = displayMessage;
const displayMainAccountStats = (stats, clan) => {
    const results = document.getElementById("results");
    const winRate = ((stats.statistics.all.wins / stats.statistics.all.battles) * 100).toFixed(2);
    results.innerHTML = `
        <p>Nickname: ${stats.nickname}</p>
        <p>Battles: ${stats.statistics.all.battles}</p>
        <p>Win Rate: ${winRate}%</p>
        <p>Clan: ${clan ? clan.name : "No clan"}</p>
    `;
};
exports.displayMainAccountStats = displayMainAccountStats;
const displayBattleEfficiencyStats = (stats) => {
    const results = document.getElementById("results");
    const avgDamage = (stats.statistics.all.damage_dealt / stats.statistics.all.battles).toFixed(2);
    const avgXp = (stats.statistics.all.xp / stats.statistics.all.battles).toFixed(2);
    results.innerHTML = `
        <p>Hit Percentage: ${stats.statistics.all.hits_percents}%</p>
        <p>Average Damage: ${avgDamage}</p>
        <p>Average Experience: ${avgXp}</p>
        <p>Max Frags in a Battle: ${stats.statistics.all.max_frags}</p>
        <p>Max Experience in a Battle: ${stats.statistics.all.max_xp}</p>
    `;
};
exports.displayBattleEfficiencyStats = displayBattleEfficiencyStats;
const displayClanStats = (clanStats) => {
    const results = document.getElementById("results");
    const createdDate = new Date(clanStats.created_at * 1000).toLocaleDateString();
    results.innerHTML = `
        <p>Members Count: ${clanStats.members_count}</p>
        <p>Created At: ${createdDate}</p>
        <p>Description: ${clanStats.description}</p>
    `;
};
exports.displayClanStats = displayClanStats;
