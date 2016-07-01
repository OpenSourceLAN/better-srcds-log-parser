import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export declare class ServerCvarType extends SrcdsLogType.SrcdsLog {
    Cvar: string;
    Value: any;
    constructor(time: moment.Moment, data: RegExpExecArray, extraArg: string);
    static Identifier: Globals.RegexAssignment[];
}
