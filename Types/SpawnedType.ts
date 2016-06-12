// Molotov projectile spawned at 640.820129 1639.490845 1771.947754, velocity -778.071533 338.524658 249.602264
export class SpawnedType extends SrcdsLog {
	public ItemSpawned: string;
	public SpawnedAt: Vector;
	public Velocity: Vector;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);

		this.ItemSpawned = data[1];
		this.SpawnedAt = new Vector(data[2], data[3], data[4]);
		this.Velocity = new Vector(data[5], data[6], data[7]);
		this.Type = "Spawned";
	}
	static Identifier: RegexAssignment = {
		regex: new RegExp(/(.+?) projectile spawned at /.source + VectorRegex.source + /, velocity /.source + VectorRegex.source + "$")
	}
}