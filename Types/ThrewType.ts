// "SomePlayer<9><STEAM_1:0:123455><CT>" threw smokegrenade [198 -683 1616]
export class ThrewType extends SrcdsLog {
	public ItemThrown: string;
	public Player: Player;
	public ThrownFrom: Vector;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Player = new Player(data[1]);
		this.ItemThrown = data[2];
		this.ThrownFrom = new Vector(data[3],data[4], data[5]);
		this.Type = "Threw";
	}

	static Identifier: RegexAssignment = {
		// "SomePlayer<9><STEAM_1:0:123455><CT>" threw smokegrenade [198 -683 1616]
		regex: new RegExp("^" + SteamIdRegex.source + / threw (\w+) /.source + VectorRegex.source + /$/.source),
	}
}