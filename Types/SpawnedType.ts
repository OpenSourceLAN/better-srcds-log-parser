import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
// Molotov projectile spawned at 640.820129 1639.490845 1771.947754, velocity -778.071533 338.524658 249.602264
export class SpawnedType extends SrcdsLogType.SrcdsLog {
	public ItemSpawned: string;
	public SpawnedAt: Globals.Vector;
	public Velocity: Globals.Vector;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);

		this.ItemSpawned = data[1];
		this.SpawnedAt = new Globals.Vector(data[2], data[3], data[4]);
		this.Velocity = new Globals.Vector(data[5], data[6], data[7]);
		this.Type = "Spawned";
	}
	static Identifier: Globals.RegexAssignment = {
		regex: new RegExp(/(.+?) projectile spawned at /.source + Globals.VectorRegex.source + /, velocity /.source + Globals.VectorRegex.source + "$")
	}
}