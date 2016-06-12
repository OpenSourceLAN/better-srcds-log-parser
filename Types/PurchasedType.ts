// "PlayerName<8><STEAM_1:0:123124><TERRORIST>" purchased "assaultsuit"
export class PurchasedType extends SrcdsLog {
	public ItemPurchased: string;
	public Player: Player;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Type = "Purchased";
		this.Player = new Player(data[1]);
		this.ItemPurchased = data[2];
	}
	static Identifier: RegexAssignment = {
		regex: new RegExp(/^/.source + SteamIdRegex.source + / purchased "(\w+)"$/.source)
	}
}