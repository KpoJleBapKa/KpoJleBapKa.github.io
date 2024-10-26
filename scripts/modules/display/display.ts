import { PlayerStats, Clan, ClanStats } from '../../types/types';

export const displayMessage = (message: string): void => {
    const results = document.getElementById("results") as HTMLElement;
    results.innerHTML = `<p>${message}</p>`;
};

export const displayMainAccountStats = (stats: PlayerStats, clan: Clan | null): void => {
    const results = document.getElementById("results") as HTMLElement;
    const winRate = ((stats.statistics.all.wins / stats.statistics.all.battles) * 100).toFixed(2);
    results.innerHTML = `
        <p>Nickname: ${stats.nickname}</p>
        <p>Battles: ${stats.statistics.all.battles}</p>
        <p>Win Rate: ${winRate}%</p>
        <p>Clan: ${clan ? clan.name : "No clan"}</p>
    `;
};

export const displayBattleEfficiencyStats = (stats: PlayerStats): void => {
    const results = document.getElementById("results") as HTMLElement;
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

export const displayClanStats = (clanStats: ClanStats): void => {
    const results = document.getElementById("results") as HTMLElement;
    const createdDate = new Date(clanStats.created_at * 1000).toLocaleDateString();
    results.innerHTML = `
        <p>Members Count: ${clanStats.members_count}</p>
        <p>Created At: ${createdDate}</p>
        <p>Description: ${clanStats.description}</p>
    `;
};
