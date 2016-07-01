import * as moment from "moment";
import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");

// "AttackerName<5><STEAM_1:1:121234><TERRORIST>" [-239 -285 1614] killed "VictimName<11><STEAM_1:0:1234><CT>" [184 -991 1639] with "ak47" (headshot)
export class KilledType extends SrcdsLogType.SrcdsLog {
	public AttackingPlayer: Globals.Player;
	public AttackingLocation: Globals.Vector;
	public VictimPlayer: Globals.Player;
	public VictimLocation: Globals.Vector;
	public Weapon: string;
	public How: string;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.AttackingPlayer = new Globals.Player(data[1]);
		this.AttackingLocation = new Globals.Vector(data[2],data[3],data[4]);
		this.Type = "Killed";
		this.VictimPlayer = new Globals.Player(data[5]);
		this.VictimLocation = new Globals.Vector(data[6], data[7], data[8]);
		this.Weapon = data[9];
		this.How = data[10];
	}
	static Identifier: Globals.RegexAssignment = {
		regex: new RegExp(
			/^/.source 
			+ Globals.SteamIdRegex.source 
			+ / /.source 
			+ Globals.VectorRegex.source 
			+ / killed(?: other)? /.source 
			+ Globals.SteamIdRegex.source 
			+ / /.source 
			+ Globals.VectorRegex.source 
			+ / with "(\S+)"(?: \((.+)\))?$/.source
			)
	}
}