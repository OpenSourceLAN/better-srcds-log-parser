import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export declare class SwitchedType extends SrcdsLogType.SrcdsLog {
    Player: Globals.Player;
    FromTeam: Globals.Team;
    ToTeam: Globals.Team;
    constructor(time: moment.Moment, data: RegExpExecArray);
    static Identifier: Globals.RegexAssignment;
}
