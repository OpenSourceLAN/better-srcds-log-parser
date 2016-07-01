import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export interface ISrcdsLog {
    Time: moment.Moment;
    Type: string;
}
export declare class SrcdsLog implements ISrcdsLog {
    Time: moment.Moment;
    Type: string;
    static Constructors: [{
        regex: Globals.RegexAssignment;
        cons: Globals.ConstructableType;
    }];
    constructor(time: moment.Moment);
}
export declare class UnknownType extends SrcdsLogType.SrcdsLog {
    Content: string;
    constructor(time: moment.Moment, rawMessage: string);
}
