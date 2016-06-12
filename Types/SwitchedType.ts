import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
// "PlayerName<21><STEAM_1:0:123123>" switched from team <Unassigned> to <Spectator>
export class SwitchedType extends SrcdsLogType.SrcdsLog {
	public Player: Globals.Player;
	public FromTeam: Globals.Team;
	public ToTeam: Globals.Team;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);

		this.Player = new Globals.Player(data[1]);
		this.FromTeam = Globals.getTeam(data[2]);
		this.ToTeam = Globals.getTeam(data[3]);
		this.Type = "Switched";
	}

	static Identifier: Globals.RegexAssignment = {
		regex: new RegExp("^" + Globals.SteamIdRegex.source + " switched from team " + Globals.TeamRegex.source + " to " + Globals.TeamRegex.source + "$")
	}
}