
// "AttackerName<5><STEAM_1:1:121234><TERRORIST>" [-239 -285 1614] killed "VictimName<11><STEAM_1:0:1234><CT>" [184 -991 1639] with "ak47" (headshot)
export class KilledType extends SrcdsLog {
	public AttackingPlayer: Player;
	public AttackingLocation: Vector;
	public VictimPlayer: Player;
	public VictimLocation: Vector;
	public Weapon: string;
	public How: string;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.AttackingPlayer = new Player(data[1]);
		this.AttackingLocation = new Vector(data[2],data[3],data[4]);
		this.Type = "Killed";
		this.VictimPlayer = new Player(data[5]);
		this.VictimLocation = new Vector(data[6], data[7], data[8]);
		this.Weapon = data[9];
		this.How = data[10];
	}
	static Identifier: RegexAssignment = {
		regex: new RegExp(
			/^/.source 
			+ SteamIdRegex.source 
			+ / /.source 
			+ VectorRegex.source 
			+ / killed(?: other)? /.source 
			+ SteamIdRegex.source 
			+ / /.source 
			+ VectorRegex.source 
			+ / with "(\S+)"(?: \((.+)\))?$/.source
			)
	}
}