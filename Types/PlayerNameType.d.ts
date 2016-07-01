import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export declare class PlayerNameType extends SrcdsLogType.SrcdsLog {
    Player: Globals.Player;
    NewName: string;
    constructor(time: moment.Moment, data: RegExpExecArray);
    static Identifier: Globals.RegexAssignment;
}
