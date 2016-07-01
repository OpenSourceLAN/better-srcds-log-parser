import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export declare class AssistType extends SrcdsLogType.SrcdsLog {
    Assistant: Globals.Player;
    Victim: Globals.Player;
    constructor(time: moment.Moment, data: RegExpExecArray);
    static Identifier: Globals.RegexAssignment;
}
