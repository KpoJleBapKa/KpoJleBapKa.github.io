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
Object.defineProperty(exports, "__esModule", { value: true });
exports.fetchClanStats = exports.fetchPlayerStats = exports.fetchPlayerId = void 0;
const modal_1 = require("../modals/modal");
const display_1 = require("../display/display");
const applicationId = 'd889298af2382fa0cfeb010e26874b63';
const fetchPlayerId = (nickname) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://api.worldoftanks.eu/wot/account/list/?application_id=${applicationId}&search=${nickname}`);
        const data = yield response.json();
        if (data.status === "ok" && data.data.length > 0) {
            return data.data[0].account_id;
        }
        else {
            (0, modal_1.openModal)("resultModal");
            (0, display_1.displayMessage)("Player not found");
            return null;
        }
    }
    catch (error) {
        (0, modal_1.openModal)("resultModal");
        (0, display_1.displayMessage)("Error fetching player ID");
        return null;
    }
});
exports.fetchPlayerId = fetchPlayerId;
const fetchPlayerStats = (accountId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://api.worldoftanks.eu/wot/account/info/?application_id=${applicationId}&account_id=${accountId}`);
        const data = yield response.json();
        if (data.status === "ok") {
            return data.data[accountId];
        }
        else {
            (0, modal_1.openModal)("resultModal");
            (0, display_1.displayMessage)("Error fetching player stats");
            return null;
        }
    }
    catch (error) {
        (0, modal_1.openModal)("resultModal");
        (0, display_1.displayMessage)("Error fetching player stats");
        return null;
    }
});
exports.fetchPlayerStats = fetchPlayerStats;
const fetchClanStats = (clanId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const response = yield fetch(`https://api.worldoftanks.eu/wgn/clans/info/?application_id=${applicationId}&clan_id=${clanId}`);
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
            (0, modal_1.openModal)("resultModal");
            (0, display_1.displayMessage)("Error fetching clan stats");
            return null;
        }
    }
    catch (error) {
        (0, modal_1.openModal)("resultModal");
        (0, display_1.displayMessage)("Error fetching clan stats");
        return null;
    }
});
exports.fetchClanStats = fetchClanStats;
