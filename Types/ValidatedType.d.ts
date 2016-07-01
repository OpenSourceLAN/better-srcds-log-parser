import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export declare class ValidatedType extends SrcdsLogType.SrcdsLog {
    Player: Globals.Player | string;
    Success: Boolean;
    ErrorCode: number;
    constructor(time: moment.Moment, data: RegExpExecArray, messageType: string);
    static Identifier: Globals.RegexAssignment[];
}
