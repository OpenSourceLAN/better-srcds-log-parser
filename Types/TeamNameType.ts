// Team playing "CT": blarhg
export class TeamNameType extends SrcdsLog {
	public Team: Team;
	public Name: string;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Team = getTeam(data[1]);
		this.Name = data[2];
		this.Type = "TeamName";
	}

	static Identifier: RegexAssignment = {
		regex: new RegExp(/^Team playing /.source + TeamRegex.source + /: (.+)$/.source),
	}
}