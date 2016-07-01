import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export declare enum ServerEvents {
    MapLoading = 1,
    MapStarted = 2,
    LogFileOpened = 3,
    LogFileClosed = 4,
    ServerMessage = 5,
    Unknown = 6,
}
export declare class ServerEventType extends SrcdsLogType.SrcdsLog {
    EventType: ServerEvents;
    Data: any;
    constructor(time: moment.Moment, data: RegExpExecArray, extraArg: string);
    static Identifier: Globals.RegexAssignment[];
}
