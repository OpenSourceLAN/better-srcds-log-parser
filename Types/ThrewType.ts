import * as moment from "moment";
import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
// "SomePlayer<9><STEAM_1:0:123455><CT>" threw smokegrenade [198 -683 1616]
export class ThrewType extends SrcdsLogType.SrcdsLog {
	public ItemThrown: string;
	public Player: Globals.Player;
	public ThrownFrom: Globals.Vector;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Player = new Globals.Player(data[1]);
		this.ItemThrown = data[2];
		this.ThrownFrom = new Globals.Vector(data[3],data[4], data[5]);
		this.Type = "Threw";
	}

	static Identifier: Globals.RegexAssignment = {
		// "SomePlayer<9><STEAM_1:0:123455><CT>" threw smokegrenade [198 -683 1616]
		regex: new RegExp("^" + Globals.SteamIdRegex.source + / threw (\w+) /.source + Globals.VectorRegex.source + /$/.source),
	}
}