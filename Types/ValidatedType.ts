import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
// "PlayerName<8><STEAM_1:0:123124124><>" STEAM USERID validated
// STEAMAUTH: Client Some Username goes here received failure code 6
export class ValidatedType extends SrcdsLogType.SrcdsLog {
	public Player: Globals.Player | string;
	public Success: Boolean;
	public ErrorCode: number;
	constructor(time:moment.Moment, data: RegExpExecArray, messageType: string) {
		super(time);
		this.Type = "Validated";

		if (messageType == 'valid') {
			this.Player = new Globals.Player(data[1]);
			this.Success = true;
		} else if (messageType == 'failed') {
			this.Player = data[1];
			this.Success = false;
			this.ErrorCode = parseInt(data[2]);
		} else {
			throw "invalid"
		}
	}

	static Identifier: Globals.RegexAssignment[] = [
	{
		// "PlayerName<8><STEAM_1:0:123124124><>" STEAM USERID validated
		regex: new RegExp("^" + Globals.SteamIdRegex.source + / STEAM USERID validated$/.source),
		extraArg: 'valid'
	},
	{
		// STEAMAUTH: Client Some Username goes here received failure code 6
		regex: /^STEAMAUTH: Client (.+) received failure code (\d*)/,
		extraArg: 'failed',
	}
	];
}