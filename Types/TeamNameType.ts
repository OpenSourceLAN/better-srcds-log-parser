import * as moment from "moment";
import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
// Team playing "CT": blarhg
export class TeamNameType extends SrcdsLogType.SrcdsLog {
	public Team: Globals.Team;
	public Name: string;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Team = Globals.getTeam(data[1]);
		this.Name = data[2];
		this.Type = "TeamName";
	}

	static Identifier: Globals.RegexAssignment = {
		regex: new RegExp(/^Team playing /.source + Globals.TeamRegex.source + /: (.+)$/.source),
	}
}