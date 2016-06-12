import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");

export enum PlayerTriggerType {
	Begin_Bomb_Defuse_Without_Kit,
	Begin_Bomb_Defuse_With_Kit,
	Defused_The_Bomb,
	Planted_The_Bomb,
	Round_End,
	Got_The_Bomb,
	Dropped_The_Bomb,
	Game_Commencing,
	Round_Start,
	Match_Start,
	Restart_Round_1_second,  // Restart_Round_(1_second)
	Restart_Round_3_seconds, //Restart_Round_(3_seconds)
	clantag,
	Unknown,
}

// "SomePlayer<5><STEAM_1:1:12345><TERRORIST>" triggered "Dropped_The_Bomb"
export class PlayerTriggeredType extends SrcdsLogType.SrcdsLog {
	public EventType: PlayerTriggerType;
	public Player: Globals.Player;
	public Value: string;

	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Type = "PlayerTriggered";
		this.Player = new Globals.Player(data[1]);
		let eventType:string = data[2];
		this.Value = data[3];
		
		// todo: I though typescript supported string indexes on enums
		switch (eventType) {
				case 'Begin_Bomb_Defuse_Without_Kit':this.EventType = PlayerTriggerType.Begin_Bomb_Defuse_Without_Kit; break;
				case 'Begin_Bomb_Defuse_With_Kit':this.EventType = PlayerTriggerType.Begin_Bomb_Defuse_With_Kit; break;
				case 'Defused_The_Bomb':this.EventType = PlayerTriggerType.Defused_The_Bomb; break;
				case 'Planted_The_Bomb':this.EventType = PlayerTriggerType.Planted_The_Bomb; break;
				case 'Round_End':this.EventType = PlayerTriggerType.Round_End; break;
				case 'Got_The_Bomb':this.EventType = PlayerTriggerType.Got_The_Bomb; break;
				case 'Dropped_The_Bomb':this.EventType = PlayerTriggerType.Dropped_The_Bomb; break;
				case 'Game_Commencing':this.EventType = PlayerTriggerType.Game_Commencing; break;
				case 'Round_Start':this.EventType = PlayerTriggerType.Round_Start; break;
				case 'Match_Start':this.EventType = PlayerTriggerType.Match_Start; break;
				case 'Restart_Round_(1_second)':this.EventType = PlayerTriggerType.Restart_Round_1_second; break;
				case 'Restart_Round_(3_seconds)':this.EventType = PlayerTriggerType.Restart_Round_3_seconds; break;
				case 'clantag':this.EventType = PlayerTriggerType.clantag; break;
			default: this.EventType = PlayerTriggerType.Unknown; console.error("Unknown player trigger event type: ", eventType); break;
		}
	}
	static Identifier: Globals.RegexAssignment[] = [{
		regex: new RegExp(/^/.source + Globals.SteamIdRegex.source + / triggered "(\S+)"(?: \(value "(.*)"\))?$/.source)
	},
	{
		regex: new RegExp(/^/.source + Globals.SteamIdRegex.source + / triggered "(\S+)" on "(\S+)"$/.source)
	}]
}