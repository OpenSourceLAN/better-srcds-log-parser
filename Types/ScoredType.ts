// Team "TERRORIST" scored "8" with "5" players
export class ScoredType extends SrcdsLog {
	public Team: Team;
	public Score: number;
	public PlayerCount: number;
	constructor(time: moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Type = "Scored";
		this.Team = getTeam(data[1]);
		this.Score = parseInt(data[2]);
		this.PlayerCount = parseInt(data[3]);
	}
	static Identifier: RegexAssignment = {
		regex: new RegExp(/^Team /.source + TeamRegex.source + / scored "(\d+)" with "(\d+)" players$/.source)
	}
}