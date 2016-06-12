// "PlayerName<21><STEAM_1:0:123123>" switched from team <Unassigned> to <Spectator>
export class SwitchedType extends SrcdsLog {
	public Player: Player;
	public FromTeam: Team;
	public ToTeam: Team;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);

		this.Player = new Player(data[1]);
		this.FromTeam = getTeam(data[2]);
		this.ToTeam = getTeam(data[3]);
		this.Type = "Switched";
	}

	static Identifier: RegexAssignment = {
		regex: new RegExp("^" + SteamIdRegex.source + " switched from team " + TeamRegex.source + " to " + TeamRegex.source + "$")
	}
}