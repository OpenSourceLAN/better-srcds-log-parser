import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export declare class AttackedType extends SrcdsLogType.SrcdsLog {
    AttackingPlayer: Globals.Player;
    AttackingLocation: Globals.Vector;
    VictimPlayer: Globals.Player;
    VictimLocation: Globals.Vector;
    DamageAmount: number;
    DamageArmourAmount: number;
    RemainingHealth: number;
    RemainingArmour: number;
    HitGroup: string;
    Weapon: string;
    constructor(time: moment.Moment, data: RegExpExecArray);
    static Identifier: Globals.RegexAssignment;
}
