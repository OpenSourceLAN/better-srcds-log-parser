import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export declare class SayType extends SrcdsLogType.SrcdsLog {
    Player: Globals.Player;
    Message: string;
    To: string;
    constructor(time: moment.Moment, data: RegExpExecArray);
    static Identifier: Globals.RegexAssignment;
}
