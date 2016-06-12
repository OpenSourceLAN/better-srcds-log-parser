// "PlayerName<10><STEAM_1:1:123124><TERRORIST>" [-1117 2465 -72] committed suicide with "world"
export class SuicideType extends SrcdsLog {
	public Player: Player;
	public At: Vector;
	public With: string;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Player = new Player(data[1]);
		this.At = new Vector(data[2],data[3], data[4]);
		this.With = data[5];
		this.Type = "Suicide";
	}
	static Identifier: RegexAssignment = {
		regex: new RegExp("^" + SteamIdRegex.source + " " + VectorRegex.source + / committed suicide with "(.+)"$/.source)
	}
}