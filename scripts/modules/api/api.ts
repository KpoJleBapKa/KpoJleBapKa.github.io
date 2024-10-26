import { PlayerStats, ClanStats } from '../../types/types';
import { openModal } from '../modals/modal';
import { displayMessage } from '../display/display';

const applicationId = 'd889298af2382fa0cfeb010e26874b63';

export const fetchPlayerId = async (nickname: string): Promise<number | null> => {
    try {
        const response = await fetch(`https://api.worldoftanks.eu/wot/account/list/?application_id=${applicationId}&search=${nickname}`);
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

export const fetchPlayerStats = async (accountId: number): Promise<PlayerStats | null> => {
    try {
        const response = await fetch(`https://api.worldoftanks.eu/wot/account/info/?application_id=${applicationId}&account_id=${accountId}`);
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

export const fetchClanStats = async (clanId: number): Promise<ClanStats | null> => {
    try {
        const response = await fetch(`https://api.worldoftanks.eu/wgn/clans/info/?application_id=${applicationId}&clan_id=${clanId}`);
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
