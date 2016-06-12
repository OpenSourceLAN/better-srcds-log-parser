
// "oldName<14><STEAM_1:0:1231245><CT>" changed name to "MoeycQ"
export class PlayerNameType extends SrcdsLog {
	public Player: Player;
	public NewName: string;
	constructor(time: moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Player = new Player(data[1]);
		this.NewName = data[2];
		this.Type = "PlayerName";
	 }
	 static Identifier: RegexAssignment = {
	 	regex: new RegExp(/^/.source + SteamIdRegex.source + / changed name to "(.+)"$/.source)
	 }
}