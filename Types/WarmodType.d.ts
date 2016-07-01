import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export declare class WarmodType extends SrcdsLogType.SrcdsLog {
    Payload: any;
    constructor(time: moment.Moment, data: RegExpExecArray);
    static Identifier: Globals.RegexAssignment;
}
