import * as moment from "moment";
import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
// "PlayerName<8><STEAM_1:0:12345><TERRORIST>" say "god bless KS"
export class SayType extends SrcdsLogType.SrcdsLog {
	public Player: Globals.Player;
	public Message: string;
	public To: string;
	constructor(time: moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Player = new Globals.Player(data[1]);
		this.To = data[2];
		this.Message = data[3];
		this.Type = "Say";
	}
	static Identifier: Globals.RegexAssignment = {
		regex: new RegExp(/^/.source + Globals.SteamIdRegex.source + / (say|say_team) "(.+)"$/.source)
	}
}