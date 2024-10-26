import { fetchPlayerId, fetchPlayerStats, fetchClanStats } from '../modules/api/api';
import { displayMainAccountStats, displayBattleEfficiencyStats, displayClanStats, displayMessage } from '../modules/display/display';
import { openModal, closeModal, setupCloseModalHandlers } from '../modules/modals/modal';

setupCloseModalHandlers();

const searchButton = document.getElementById("searchButton") as HTMLElement;
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
