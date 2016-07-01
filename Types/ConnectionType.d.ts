import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export declare enum ConnectionActions {
    Connected = 1,
    Disconnected = 2,
    EnteredGame = 3,
    Unknown = 4,
}
export declare class ConnectionType extends SrcdsLogType.SrcdsLog {
    Player: Globals.Player;
    Action: ConnectionActions;
    Reason: string;
    Address: string;
    constructor(time: moment.Moment, data: RegExpExecArray);
    static Identifier: Globals.RegexAssignment[];
}
