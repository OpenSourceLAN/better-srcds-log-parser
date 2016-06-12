import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
// Team "TERRORIST" scored "8" with "5" players
export class ScoredType extends SrcdsLogType.SrcdsLog {
	public Team: Globals.Team;
	public Score: number;
	public PlayerCount: number;
	constructor(time: moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Type = "Scored";
		this.Team = Globals.getTeam(data[1]);
		this.Score = parseInt(data[2]);
		this.PlayerCount = parseInt(data[3]);
	}
	static Identifier: Globals.RegexAssignment = {
		regex: new RegExp(/^Team /.source + Globals.TeamRegex.source + / scored "(\d+)" with "(\d+)" players$/.source)
	}
}