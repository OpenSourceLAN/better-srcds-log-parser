import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export declare enum PlayerTriggerType {
    Begin_Bomb_Defuse_Without_Kit = 0,
    Begin_Bomb_Defuse_With_Kit = 1,
    Defused_The_Bomb = 2,
    Planted_The_Bomb = 3,
    Round_End = 4,
    Got_The_Bomb = 5,
    Dropped_The_Bomb = 6,
    Game_Commencing = 7,
    Round_Start = 8,
    Match_Start = 9,
    Restart_Round_1_second = 10,
    Restart_Round_3_seconds = 11,
    clantag = 12,
    Unknown = 13,
}
export declare class PlayerTriggeredType extends SrcdsLogType.SrcdsLog {
    EventType: PlayerTriggerType;
    Player: Globals.Player;
    Value: string;
    constructor(time: moment.Moment, data: RegExpExecArray);
    static Identifier: Globals.RegexAssignment[];
}
