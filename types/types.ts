export type Player = {
    nickname: string;
    account_id: number;
};

export type PlayerStats = {
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

export type Clan = {
    tag: string;
    name: string;
};

export type ClanStats = Clan & {
    members_count: number;
    created_at: number;
    description: string;
};
