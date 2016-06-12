import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
// "PlayerName<8><STEAM_1:0:123124><TERRORIST>" purchased "assaultsuit"
export class PurchasedType extends SrcdsLogType.SrcdsLog {
	public ItemPurchased: string;
	public Player: Globals.Player;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Type = "Purchased";
		this.Player = new Globals.Player(data[1]);
		this.ItemPurchased = data[2];
	}
	static Identifier: Globals.RegexAssignment = {
		regex: new RegExp(/^/.source + Globals.SteamIdRegex.source + / purchased "(\w+)"$/.source)
	}
}