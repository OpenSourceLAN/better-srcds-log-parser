import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");

// "oldName<14><STEAM_1:0:1231245><CT>" changed name to "MoeycQ"
export class PlayerNameType extends SrcdsLogType.SrcdsLog {
	public Player: Globals.Player;
	public NewName: string;
	constructor(time: moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Player = new Globals.Player(data[1]);
		this.NewName = data[2];
		this.Type = "PlayerName";
	 }
	 static Identifier: Globals.RegexAssignment = {
	 	regex: new RegExp(/^/.source + Globals.SteamIdRegex.source + / changed name to "(.+)"$/.source)
	 }
}