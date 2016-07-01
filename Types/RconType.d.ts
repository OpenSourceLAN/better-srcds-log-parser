import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export declare class RconType extends SrcdsLogType.SrcdsLog {
    CommandSourceAddress: string;
    Command: string;
    constructor(time: moment.Moment, data: RegExpExecArray);
    static Identifier: Globals.RegexAssignment;
}
