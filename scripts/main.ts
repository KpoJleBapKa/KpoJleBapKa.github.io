type Player = {
    nickname: string;
    account_id: number;
};

type PlayerStats = {
    nickname: string;
    statistics: {
        all: {
            battles: number;
            wins: number;
            losses: number;
            hits_percents: number;
            damage_dealt: number;
            damage_received: number;
            xp: number;
            max_frags: number;
            max_xp: number;
        };
    };
    clan_id: number | null;
};

type Clan = {
    tag: string;
    name: string;
};

type ClanStats = Clan & {
    members_count: number;
    created_at: number;
    description: string;
};

const openModal = (modalId: string): void => { // відкриття модального вікна
    const modal = document.getElementById(modalId) as HTMLElement;
    modal.style.display = "block";
};

const closeModal = (modalId: string): void => { // закриття модального вікна
    const modal = document.getElementById(modalId) as HTMLElement;
    modal.style.display = "none";
};

const closeButtons = document.getElementsByClassName("close"); // обробники подій для закриття модальних вікон
for (let i = 0; i < closeButtons.length; i++) {
    closeButtons[i].addEventListener("click", function(this: HTMLElement) {
        closeModal(this.parentElement?.parentElement?.id as string);
    });
}

window.onclick = function(event: MouseEvent) { // закривання модального вікна клікаючи за межами цього модального вікна
    const chooseModal = document.getElementById("chooseModal") as HTMLElement;
    const resultModal = document.getElementById("resultModal") as HTMLElement;
    if (event.target == chooseModal) {
        closeModal("chooseModal");
    }
    if (event.target == resultModal) {
        closeModal("resultModal");
    }
};

const fetchPlayerId = async (nickname: string): Promise<number | null> => { // отримання айді гравця через нікнейм 
    try {
        const response = await fetch(`https://api.worldoftanks.eu/wot/account/list/?application_id=d889298af2382fa0cfeb010e26874b63&search=${nickname}`);
        const data = await response.json();
        if (data.status === "ok" && data.data.length > 0) {
            return data.data[0].account_id;
        } else {
            openModal("resultModal");
            displayMessage("Player not found");
            return null;
        }
    } catch (error) {
        openModal("resultModal");
        displayMessage("Error fetching player ID");
        return null;
    }
};

const fetchPlayerStats = async (accountId: number): Promise<PlayerStats | null> => { // отримання статки через айді
    try {
        const response = await fetch(`https://api.worldoftanks.eu/wot/account/info/?application_id=d889298af2382fa0cfeb010e26874b63&account_id=${accountId}`);
        const data = await response.json();
        if (data.status === "ok") {
            return data.data[accountId];
        } else {
            openModal("resultModal");
            displayMessage("Error fetching player stats");
            return null;
        }
    } catch (error) {
        openModal("resultModal");
        displayMessage("Error fetching player stats");
        return null;
    }
};

const fetchClanStats = async (clanId: number): Promise<ClanStats | null> => { // отримання статки клану через айді
    try {
        const response = await fetch(`https://api.worldoftanks.eu/wgn/clans/info/?application_id=d889298af2382fa0cfeb010e26874b63&clan_id=${clanId}`);
        const data = await response.json();
        if (data.status === "ok") {
            const clanData = data.data[clanId];
            return {
                tag: clanData.tag,
                name: clanData.name,
                members_count: clanData.members_count,
                created_at: clanData.created_at,
                description: clanData.description
            };
        } else {
            openModal("resultModal");
            displayMessage("Error fetching clan stats");
            return null;
        }
    } catch (error) {
        openModal("resultModal");
        displayMessage("Error fetching clan stats");
        return null;
    }
};

const displayMessage = (message: string): void => { 
    const results = document.getElementById("results") as HTMLElement;
    results.innerHTML = `<p>${message}</p>`;
};

const displayMainAccountStats = (stats: PlayerStats, clan: Clan | null): void => { // відображення основної статки
    const results = document.getElementById("results") as HTMLElement;
    const winRate = ((stats.statistics.all.wins / stats.statistics.all.battles) * 100).toFixed(2);
    results.innerHTML = `
        <p>Nickname: ${stats.nickname}</p>
        <p>Battles: ${stats.statistics.all.battles}</p>
        <p>Win Rate: ${winRate}%</p>
        <p>Clan: ${clan ? clan.name : "No clan"}</p>
    `;
};

const displayBattleEfficiencyStats = (stats: PlayerStats): void => { // відображення вогневої міці
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

const displayClanStats = (clanStats: ClanStats): void => { // відображення статки клану
    const results = document.getElementById("results") as HTMLElement;
    const createdDate = new Date(clanStats.created_at * 1000).toLocaleDateString();
    results.innerHTML = `
        <p>Members Count: ${clanStats.members_count}</p>
        <p>Created At: ${createdDate}</p>
        <p>Description: ${clanStats.description}</p>
    `;
};

const searchButton = document.getElementById("searchButton") as HTMLElement; // обробник події для кнопки пошуку
searchButton.addEventListener("click", async () => {
    const playerName = (document.getElementById("playerName") as HTMLInputElement).value;
    if (playerName) {
        const playerId = await fetchPlayerId(playerName);
        if (playerId) {
            openModal("chooseModal");

            const mainStatsButton = document.getElementById("mainStatsButton") as HTMLElement;
            const battleStatsButton = document.getElementById("battleStatsButton") as HTMLElement;
            const clanStatsButton = document.getElementById("clanStatsButton") as HTMLElement;

            mainStatsButton.onclick = async () => {
                const playerStats = await fetchPlayerStats(playerId);
                if (playerStats) {
                    const clan = playerStats.clan_id ? await fetchClanStats(playerStats.clan_id) : null;
                    closeModal("chooseModal");
                    openModal("resultModal");
                    displayMainAccountStats(playerStats, clan);
                }
            };

            battleStatsButton.onclick = async () => {
                const playerStats = await fetchPlayerStats(playerId);
                if (playerStats) {
                    closeModal("chooseModal");
                    openModal("resultModal");
                    displayBattleEfficiencyStats(playerStats);
                }
            };

            clanStatsButton.onclick = async () => {
                const playerStats = await fetchPlayerStats(playerId);
                if (playerStats && playerStats.clan_id) {
                    const clanStats = await fetchClanStats(playerStats.clan_id);
                    if (clanStats) {
                        closeModal("chooseModal");
                        openModal("resultModal");
                        displayClanStats(clanStats);
                    }
                } else {
                    closeModal("chooseModal");
                    openModal("resultModal");
                    displayMessage("Player is not in a clan");
                }
            };
        }
    } else {
        openModal("resultModal");
        displayMessage("Please enter a player name");
    }
});

