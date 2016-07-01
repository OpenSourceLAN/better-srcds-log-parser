import SrcdsType = require("./Types/SrcdsLog");
export declare var SteamIdRegex: RegExp;
export declare var TeamRegex: RegExp;
export declare var VectorRegex: RegExp;
export declare function getTeam(team: string): Team;
export declare enum Team {
    CounterTerrorist = 0,
    Terrorist = 1,
    Unassigned = 2,
    Spectator = 3,
    Unknown = 4,
}
export declare class Player {
    static regex: RegExp;
    static chickenRegex: RegExp;
    Name: string;
    PlayerID: number;
    SteamID: string;
    Team: Team;
    constructor(playerString: string);
}
export declare class Vector {
    x: number;
    y: number;
    z: number;
    static ReplaceRegex: RegExp;
    constructor(x: string, y: string, z: string);
}
export interface ConstructableType {
    new (time: moment.Moment, data: RegExpExecArray, extraArg?: any): SrcdsType.ISrcdsLog;
    Identifier: RegexAssignment | RegexAssignment[];
}
export interface RegexAssignment {
    regex: RegExp;
    extraArg?: any;
}
