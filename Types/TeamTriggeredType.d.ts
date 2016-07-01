import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export declare enum TeamTriggerType {
    SFUI_Notice_Terrorists_Win = 1,
    SFUI_Notice_CTs_Win = 2,
    SFUI_Notice_Target_Bombed = 3,
    SFUI_Notice_Target_Saved = 4,
    SFUI_Notice_Bomb_Defused = 5,
    Unknown = -1,
}
export declare class TeamTriggeredType extends SrcdsLogType.SrcdsLog {
    EventType: TeamTriggerType;
    Team: Globals.Team;
    TerroristScore: number;
    CounterTerroristScore: number;
    constructor(time: moment.Moment, data: RegExpExecArray);
    static Identifier: Globals.RegexAssignment;
}
