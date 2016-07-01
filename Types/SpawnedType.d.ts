import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export declare class SpawnedType extends SrcdsLogType.SrcdsLog {
    ItemSpawned: string;
    SpawnedAt: Globals.Vector;
    Velocity: Globals.Vector;
    constructor(time: moment.Moment, data: RegExpExecArray);
    static Identifier: Globals.RegexAssignment;
}
