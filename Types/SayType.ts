// "PlayerName<8><STEAM_1:0:12345><TERRORIST>" say "god bless KS"
export class SayType extends SrcdsLog {
	public Player: Player;
	public Message: string;
	public To: string;
	constructor(time: moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Player = new Player(data[1]);
		this.To = data[2];
		this.Message = data[3];
		this.Type = "Say";
	}
	static Identifier: RegexAssignment = {
		regex: new RegExp(/^/.source + SteamIdRegex.source + / (say|say_team) "(.+)"$/.source)
	}
}