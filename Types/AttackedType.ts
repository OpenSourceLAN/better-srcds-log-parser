
// "AttackerName<10><STEAM_1:1:1234><TERRORIST>" [-1115 -582 -135] attacked "VictimName<15><STEAM_1:0:12412><CT>" [-1274 -1333 -171] with "ak47" (damage "108") (damage_armor "15") (health "0") (armor "70") (hitgroup "head")
export class AttackedType extends SrcdsLog {
	public AttackingPlayer: Player;
	public AttackingLocation: Vector;
	public VictimPlayer: Player;
	public VictimLocation: Vector;
	public DamageAmount: number;
	public DamageArmourAmount: number;
	public RemainingHealth: number;
	public RemainingArmour: number;
	public HitGroup: string;
	public Weapon: string;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.AttackingPlayer = new Player(data[1]);
		this.AttackingLocation = new Vector(data[2],data[3],data[4]);
		this.Type = "Attacked";
		this.VictimPlayer = new Player(data[5]);
		this.VictimLocation = new Vector(data[6], data[7], data[8]);
		this.Weapon = data[9];
		this.DamageAmount = parseInt(data[10]);
		this.DamageArmourAmount = parseInt(data[11]);
		this.RemainingHealth = parseInt(data[12]);
		this.RemainingArmour = parseInt(data[13]);
		this.HitGroup = data[14];
	}
	static Identifier: RegexAssignment = {
		regex: new RegExp(/^/.source
			+ SteamIdRegex.source
			+ / /.source
			+ VectorRegex.source
			+ / attacked /.source
			+ SteamIdRegex.source
			+ / /.source
			+ VectorRegex.source
			+ / with "(\S+)" \(damage "(\d+)"\) \(damage_armor "(\d+)"\) \(health "(\d+)"\) \(armor "(\d+)"\) \(hitgroup "(.+)"\)$/.source
			)
	}
}