import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
var warmodMagicString = "[WarMod_BFG]";


//06/09/2016 - 10:07:18: [WarMod_BFG] {"timestamp": "2016-06-09 10:07:18", "event": "knife_player_say", "round": 1, "player": {"name": "...", "userId": 14, "uniqueId": "STEAM_1:1:", "team": 3}, "message": ".ready", "teamOnly": 0}
export class WarmodType extends SrcdsLogType.SrcdsLog {
	public Payload: any;
	constructor(time: moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Payload = JSON.parse(data[1]);
		this.Type = "Warmod";
	}

	static Identifier: Globals.RegexAssignment = {
		//06/09/2016 - 10:07:18: [WarMod_BFG] {"timestamp": "2016-06-09 10:07:18", "event": "knife_player_say", "round": 1, "player": {"name": "...", "userId": 14, "uniqueId": "STEAM_1:1:", "team": 3}, "message": ".ready", "teamOnly": 0}
		regex: /^\[WarMod_BFG\] (.+)$/,
	}
}