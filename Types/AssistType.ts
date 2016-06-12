// "AssitantName<16><STEAM_1:0:123123><TERRORIST>" assisted killing "VictimName<12><STEAM_1:0:15612><CT>"
export class AssistType extends SrcdsLog {
	public Assistant: Player;
	public Victim: Player;
	constructor(time: moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Type = "Assist";
		this.Assistant = new Player(data[1]);
		this.Victim = new Player(data[2]);
	}
	static Identifier: RegexAssignment = {
		regex: new RegExp(/^/.source + SteamIdRegex.source + / assisted killing /.source + SteamIdRegex.source)
	}
}