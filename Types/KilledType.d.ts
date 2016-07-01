import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export declare class KilledType extends SrcdsLogType.SrcdsLog {
    AttackingPlayer: Globals.Player;
    AttackingLocation: Globals.Vector;
    VictimPlayer: Globals.Player;
    VictimLocation: Globals.Vector;
    Weapon: string;
    How: string;
    constructor(time: moment.Moment, data: RegExpExecArray);
    static Identifier: Globals.RegexAssignment;
}
