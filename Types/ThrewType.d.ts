import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export declare class ThrewType extends SrcdsLogType.SrcdsLog {
    ItemThrown: string;
    Player: Globals.Player;
    ThrownFrom: Globals.Vector;
    constructor(time: moment.Moment, data: RegExpExecArray);
    static Identifier: Globals.RegexAssignment;
}
