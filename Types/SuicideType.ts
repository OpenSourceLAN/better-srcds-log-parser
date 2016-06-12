import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
// "PlayerName<10><STEAM_1:1:123124><TERRORIST>" [-1117 2465 -72] committed suicide with "world"
export class SuicideType extends SrcdsLogType.SrcdsLog {
	public Player: Globals.Player;
	public At: Globals.Vector;
	public With: string;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Player = new Globals.Player(data[1]);
		this.At = new Globals.Vector(data[2],data[3], data[4]);
		this.With = data[5];
		this.Type = "Suicide";
	}
	static Identifier: Globals.RegexAssignment = {
		regex: new RegExp("^" + Globals.SteamIdRegex.source + " " + Globals.VectorRegex.source + / committed suicide with "(.+)"$/.source)
	}
}