import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
// "AssitantName<16><STEAM_1:0:123123><TERRORIST>" assisted killing "VictimName<12><STEAM_1:0:15612><CT>"
export class AssistType extends SrcdsLogType.SrcdsLog {
	public Assistant: Globals.Player;
	public Victim: Globals.Player;
	constructor(time: moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Type = "Assist";
		this.Assistant = new Globals.Player(data[1]);
		this.Victim = new Globals.Player(data[2]);
	}
	static Identifier: Globals.RegexAssignment = {
		regex: new RegExp(/^/.source + Globals.SteamIdRegex.source + / assisted killing /.source + Globals.SteamIdRegex.source)
	}
}