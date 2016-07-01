import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export declare class SuicideType extends SrcdsLogType.SrcdsLog {
    Player: Globals.Player;
    At: Globals.Vector;
    With: string;
    constructor(time: moment.Moment, data: RegExpExecArray);
    static Identifier: Globals.RegexAssignment;
}
