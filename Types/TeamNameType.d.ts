import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export declare class TeamNameType extends SrcdsLogType.SrcdsLog {
    Team: Globals.Team;
    Name: string;
    constructor(time: moment.Moment, data: RegExpExecArray);
    static Identifier: Globals.RegexAssignment;
}
