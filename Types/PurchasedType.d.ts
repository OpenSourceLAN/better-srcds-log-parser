import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export declare class PurchasedType extends SrcdsLogType.SrcdsLog {
    ItemPurchased: string;
    Player: Globals.Player;
    constructor(time: moment.Moment, data: RegExpExecArray);
    static Identifier: Globals.RegexAssignment;
}
