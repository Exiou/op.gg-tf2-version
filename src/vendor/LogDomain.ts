/* eslint-disable camelcase */
export interface LogResponse {
    version: number;
    teams: Teams;
    length: number;
    players: { [key: string]: PlayerData };
    names: { [key: string]: string };
    rounds: Round[];
    healspread: { [key: string]: { [key: string]: number } };
    classkills: { [key: string] : ClassKills};
    classdeaths: { [key: string] : ClassKills};
    classkillassists: { [key: string] : ClassKills};
    chat: Chat[];
    info: Info;
    killstreaks: Killstreak[];
    success: boolean;
}

export interface Chat {
    steamid: string;
    name: string;
    msg: string;
}

export interface ClassKills {
    soldier?: number;
    demoman?: number;
    scout?: number;
    sniper?: number;
    medic?: number;
    engineer?: number;
    spy?: number;
    pyro?: number;
    heavyweapons?: number
}

export interface Info {
    map: string;
    supplemental: boolean;
    total_length: number;
    hasRealDamage: boolean;
    hasWeaponDamage: boolean;
    hasAccuracy: boolean;
    hasHP: boolean;
    hasHP_real: boolean;
    hasHS: boolean;
    hasHS_hit: boolean;
    hasBS: boolean;
    hasCP: boolean;
    hasSB: boolean;
    hasDT: boolean;
    hasAS: boolean;
    hasHR: boolean;
    hasIntel: boolean;
    AD_scoring: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    notifications: any[];
    title: string;
    date: number;
    uploader: Uploader;
}

export interface Uploader {
    id: string;
    name: string;
    info: string;
}

export interface Killstreak {
    steamid: string;
    streak: number;
    time: number;
}

export interface PurpleWeapon {
    scattergun: TartuGecko;
    the_capper: TartuGecko;
}

export interface TartuGecko {
    kills: number;
    dmg: number;
    avg_dmg: number;
    shots: number;
    hits: number;
}

export enum TeamEnum {
    Blue = 'Blue',
    Red = 'Red',
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface PurpleUbertypes {
}

export interface FluffyWeapon {
    quake_rl: TartuGecko;
    shotgun_soldier: TartuGecko;
    tf_projectile_rocket: TartuGecko;
}

export interface TentacledWeapon {
    scattergun?: TartuGecko;
    pistol_scout?: TartuGecko;
    world?: TartuGecko;
    spy_cicle?: TartuGecko;
    letranger?: TartuGecko;
    tomislav?: TartuGecko;
    gloves_running_urgently?: TartuGecko;
    panic_attack?: TartuGecko;
    backburner?: TartuGecko;
}

export interface StickyWeapon {
    tf_projectile_pipe_remote: TartuGecko;
    iron_bomber: TartuGecko;
    world: TartuGecko;
}

export interface IndigoWeapon {
    scattergun?: TartuGecko;
    maxgun?: TartuGecko;
    sniperrifle?: TartuGecko;
    smg?: TartuGecko;
    quake_rl?: TartuGecko;
}

export interface PlayerData {
    team: TeamEnum;
    class_stats: ClassStat[];
    kills: number;
    deaths: number;
    assists: number;
    suicides: number;
    kapd: string;
    kpd: string;
    dmg: number;
    dmg_real: number;
    dt: number;
    dt_real: number;
    hr: number;
    lks: number;
    as: number;
    dapd: number;
    dapm: number;
    ubers: number;
    ubertypes: PurpleUbertypes;
    drops: number;
    medkits: number;
    medkits_hp: number;
    backstabs: number;
    headshots: number;
    headshots_hit: number;
    sentries: number;
    heal: number;
    cpc: number;
    ic: number;
}

export interface IndecentWeapon {
    quake_rl: TartuGecko;
}

export interface HilariousWeapon {
    crusaders_crossbow: TartuGecko;
    ubersaw: TartuGecko;
}

export interface AmbitiousWeapon {
    quake_rl?: TartuGecko;
    shotgun_soldier?: TartuGecko;
    shotgun_primary?: TartuGecko;
    obj_sentrygun3?: TartuGecko;
}

export interface CunningWeapon {
    scattergun?: TartuGecko;
    the_winger?: TartuGecko;
    world?: TartuGecko;
    sniperrifle?: TartuGecko;
    smg?: TartuGecko;
    tf_projectile_rocket?: TartuGecko;
}

export interface ClassStat {
    type: string;
    kills: number;
    assists: number;
    deaths: number;
    dmg: number;
    weapon: { [key: string]: TartuGecko };
    total_time: number;
}

export interface MagentaWeapon {
    crusaders_crossbow: TartuGecko;
}

export interface Medicstats {
    deaths_within_20s_after_uber: number;
}

export interface FriskyWeapon {
    tf_projectile_pipe_remote: TartuGecko;
    iron_bomber: TartuGecko;
}

export interface Round {
    start_time: number;
    winner: TeamEnum;
    team: TeamClass;
    events: Event[];
    players: { [key: string]: Player };
    firstcap: TeamEnum;
    length: number;
}

export interface Event {
    type: Type;
    time: number;
    team: TeamEnum;
    steamid?: string;
    killer?: string;
    point?: number;
    medigun?: Medigun;
}

export enum Medigun {
    Medigun = 'medigun',
}

export enum Type {
    Charge = 'charge',
    Drop = 'drop',
    MedicDeath = 'medic_death',
    Pointcap = 'pointcap',
    RoundWin = 'round_win',
}

export interface Player {
    team: TeamEnum | null;
    kills: number;
    dmg: number;
}

export interface TeamClass {
    Blue: TeamData;
    Red: TeamData;
}

export interface TeamData {
    score: number;
    kills: number;
    dmg: number;
    ubers: number;
}

export interface Teams {
    Red: TeamsData;
    Blue: TeamsData;
}

export interface TeamsData {
    score: number;
    kills: number;
    deaths: number;
    dmg: number;
    charges: number;
    drops: number;
    firstcaps: number;
    caps: number;
}
