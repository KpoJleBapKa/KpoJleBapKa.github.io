"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const openModal = (modalId) => {
    const modal = document.getElementById(modalId);
    modal.style.display = "block";
};
const closeModal = (modalId) => {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
};
const closeButtons = document.getElementsByClassName("close"); // обробники подій для закриття модальних вікон
for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", function () {
        var _a, _b;
        closeModal((_b = (_a = this.parentElement) === null || _a === void 0 ? void 0 : _a.parentElement) === null || _b === void 0 ? void 0 : _b.id);
    });
}
window.onclick = function (event) {
    const chooseModal = document.getElementById("chooseModal");
    const resultModal = document.getElementById("resultModal");
    if (event.target == chooseModal) {
        closeModal("chooseModal");
    }
    if (event.target == resultModal) {
        closeModal("resultModal");
    }
};
const fetchPlayerId = (nickname) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://api.worldoftanks.eu/wot/account/list/?application_id=d889298af2382fa0cfeb010e26874b63&search=${nickname}`);
        const data = yield response.json();
        if (data.status === "ok" && data.data.length > 0) {
            return data.data[0].account_id;
        }
        else {
            openModal("resultModal");
            displayMessage("Player not found");
            return null;
        }
    }
    catch (error) {
        openModal("resultModal");
        displayMessage("Error fetching player ID");
        return null;
    }
});
const fetchPlayerStats = (accountId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://api.worldoftanks.eu/wot/account/info/?application_id=d889298af2382fa0cfeb010e26874b63&account_id=${accountId}`);
        const data = yield response.json();
        if (data.status === "ok") {
            return data.data[accountId];
        }
        else {
            openModal("resultModal");
            displayMessage("Error fetching player stats");
            return null;
        }
    }
    catch (error) {
        openModal("resultModal");
        displayMessage("Error fetching player stats");
        return null;
    }
});
const fetchClanStats = (clanId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://api.worldoftanks.eu/wgn/clans/info/?application_id=d889298af2382fa0cfeb010e26874b63&clan_id=${clanId}`);
        const data = yield response.json();
        if (data.status === "ok") {
            const clanData = data.data[clanId];
            return {
                tag: clanData.tag,
                name: clanData.name,
                members_count: clanData.members_count,
                created_at: clanData.created_at,
                description: clanData.description
            };
        }
        else {
            openModal("resultModal");
            displayMessage("Error fetching clan stats");
            return null;
        }
    }
    catch (error) {
        openModal("resultModal");
        displayMessage("Error fetching clan stats");
        return null;
    }
});
const displayMessage = (message) => {
    const results = document.getElementById("results");
    results.innerHTML = `<p>${message}</p>`;
};
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
const displayClanStats = (clanStats) => {
    const results = document.getElementById("results");
    const createdDate = new Date(clanStats.created_at * 1000).toLocaleDateString();
    results.innerHTML = `
        <p>Members Count: ${clanStats.members_count}</p>
        <p>Created At: ${createdDate}</p>
        <p>Description: ${clanStats.description}</p>
    `;
};
const searchButton = document.getElementById("searchButton"); // обробник події для кнопки пошуку
searchButton.addEventListener("click", () => __awaiter(void 0, void 0, void 0, function* () {
    const playerName = document.getElementById("playerName").value;
    if (playerName) {
        const playerId = yield fetchPlayerId(playerName);
        if (playerId) {
            openModal("chooseModal");
            const mainStatsButton = document.getElementById("mainStatsButton");
            const battleStatsButton = document.getElementById("battleStatsButton");
            const clanStatsButton = document.getElementById("clanStatsButton");
            mainStatsButton.onclick = () => __awaiter(void 0, void 0, void 0, function* () {
                const playerStats = yield fetchPlayerStats(playerId);
                if (playerStats) {
                    const clan = playerStats.clan_id ? yield fetchClanStats(playerStats.clan_id) : null;
                    closeModal("chooseModal");
                    openModal("resultModal");
                    displayMainAccountStats(playerStats, clan);
                }
            });
            battleStatsButton.onclick = () => __awaiter(void 0, void 0, void 0, function* () {
                const playerStats = yield fetchPlayerStats(playerId);
                if (playerStats) {
                    closeModal("chooseModal");
                    openModal("resultModal");
                    displayBattleEfficiencyStats(playerStats);
                }
            });
            clanStatsButton.onclick = () => __awaiter(void 0, void 0, void 0, function* () {
                const playerStats = yield fetchPlayerStats(playerId);
                if (playerStats && playerStats.clan_id) {
                    const clanStats = yield fetchClanStats(playerStats.clan_id);
                    if (clanStats) {
                        closeModal("chooseModal");
                        openModal("resultModal");
                        displayClanStats(clanStats);
                    }
                }
                else {
                    closeModal("chooseModal");
                    openModal("resultModal");
                    displayMessage("Player is not in a clan");
                }
            });
        }
    }
    else {
        openModal("resultModal");
        displayMessage("Please enter a player name");
    }
}));
