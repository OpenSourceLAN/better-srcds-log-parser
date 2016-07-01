import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export declare class ScoredType extends SrcdsLogType.SrcdsLog {
    Team: Globals.Team;
    Score: number;
    PlayerCount: number;
    constructor(time: moment.Moment, data: RegExpExecArray);
    static Identifier: Globals.RegexAssignment;
}
