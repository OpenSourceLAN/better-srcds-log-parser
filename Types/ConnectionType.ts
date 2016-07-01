import * as moment from "moment";
import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");

export enum ConnectionActions {
	Connected = 1,
	Disconnected,
	EnteredGame,
	Unknown,
}

// "PlayerName<20><STEAM_1:0:123123><>" connected, address ""
// "Erik<18><BOT><CT>" disconnected (reason "Kicked by Console")
// "eNvy<12><STEAM_1:0:49461278><>" entered the game
export class ConnectionType extends SrcdsLogType.SrcdsLog {
	public Player: Globals.Player;
	public Action: ConnectionActions;
	public Reason: string;
	public Address: string;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Player = new Globals.Player(data[1]);
		switch (data[2]) {
			case 'connected': this.Address = data[3]; this.Action = ConnectionActions.Connected; break;
			case 'disconnected': this.Reason = data[3]; this.Action = ConnectionActions.Disconnected; break;
			case 'entered': this.Action = ConnectionActions.EnteredGame; break;
		}
		
		this.Type = "Connection";
	}
	static Identifier: Globals.RegexAssignment[] = [
	{
		regex: new RegExp(/^/.source + Globals.SteamIdRegex.source + / (connected), address "(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})?"$/.source )
	},
	{
		regex: new RegExp(/^/.source + Globals.SteamIdRegex.source + / (disconnected) \(reason "(.+)"\)$/.source )
	},
	{
		regex: new RegExp(/^/.source + Globals.SteamIdRegex.source + / (entered) the game$/.source )
	}]
}