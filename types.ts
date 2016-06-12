import moment = require("moment");

var warmodMagicString = "[WarMod_BFG]";

var RootSteamIdRegex = /".+?\<\d*\>\<(?:STEAM_\d+:\d+:\d+|BOT|Console)\>(?:\<\w*\>)?"/;
var RootChickenRegex = /"chicken\<\d+\>"/;
var SteamIdRegex = new RegExp("(" + RootSteamIdRegex.source + "|World|" + RootChickenRegex.source + ")");
var TeamRegex = /["<]?(CT|TERRORIST|Spectator|Unassigned)[">]?/;
var VectorRegex = /\[?([-.\d]+) ([-.\d]+) ([-.\d]+)\]?/;

export interface ISrcdsLog {
	Time: moment.Moment;
	Type: string;
}

export class SrcdsLog implements ISrcdsLog {
	public Time: moment.Moment;
	public Type: string;
	public static Constructors: [{regex: RegexAssignment, cons: ConstructableType}];

	constructor(time: moment.Moment) {
		//this.Time = time;	
	}

	// TODO: analyse the order of these for any exploits. Eg, if a player can call
	// themselves 'triggered' and it causes the wrong event type to be returned,
	// that's really bad
	static getIt(time: moment.Moment, rawMessage: string) : ISrcdsLog  {

		var returnValue: ISrcdsLog;

		SrcdsLog.Constructors.forEach((v) => {
			let regexResult = v.regex.regex.exec(rawMessage);
			if (regexResult) {
				returnValue = new v.cons(time, regexResult, v.regex.extraArg);
			}
		});

		if (returnValue) 
			return returnValue;
		else
			return new UnknownType(time, rawMessage);
	}
}

function getTeam(team:string) {
	if (team == "TERRORIST") {
		return Team.Terrorist;
	} else if (team == "CT") {
		return Team.CounterTerrorist;
	} else if (team == "Unassigned") {
		return Team.Unassigned;
	} else if (team == "Spectator") {
		return Team.Spectator;
	} else {
		return Team.Unknown;
	}
}
export enum Team {
	CounterTerrorist,
	Terrorist,
	Unassigned,
	Spectator,
	Unknown,
}

export class Player {
	static regex: RegExp = /^"(.+)\<(\d*)\>\<(STEAM_\d+:\d+:\d+|BOT|Console)\>(?:\<(\w*)\>)?"$/;
	static chickenRegex = /^"chicken\<(\d+)\>"$/
	public Name: string;
	public PlayerID: number;
	public SteamID: string;
	public Team: Team;
	constructor(playerString: string) {
		if (playerString == 'World') {
			this.Name = 'World';
		} else if (playerString && playerString.length > 0) {
			var regexResult = Player.regex.exec(playerString);
			if (regexResult) {
				this.Name = regexResult[1];
				this.PlayerID = parseInt(regexResult[2]);
				this.SteamID = regexResult[3];
				this.Team = getTeam(regexResult[4]);
			} else {
				regexResult = Player.chickenRegex.exec(playerString);
				if (regexResult) {
					this.Name = "chicken";
					this.PlayerID = parseInt(regexResult[1]);
				} else {
					throw `INvalid player :(  ${playerString}`;
				}
			}
		}
	}
}

export class Vector {
	public x: number;
	public y: number;
	public z: number;
	static ReplaceRegex = /[\[\]\s]/g;
	constructor(x:string,y:string,z:string) {
		this.x = parseInt(x.replace(Vector.ReplaceRegex, ''));
		this.y = parseInt(y.replace(Vector.ReplaceRegex, ''));
		this.z = parseInt(z.replace(Vector.ReplaceRegex, ''));
	}
}

export class UnknownType extends SrcdsLog {
	public Content: string;
	constructor(time: moment.Moment, rawMessage: string) {
		super(time);
		this.Content = rawMessage;
		this.Type = "Unknown";
	 }

}

// "AssitantName<16><STEAM_1:0:123123><TERRORIST>" assisted killing "VictimName<12><STEAM_1:0:15612><CT>"
export class AssistType extends SrcdsLog {
	public Assistant: Player;
	public Victim: Player;
	constructor(time: moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Type = "Assist";
		this.Assistant = new Player(data[1]);
		this.Victim = new Player(data[2]);
	}
	static Identifier: RegexAssignment = {
		regex: new RegExp(/^/.source + SteamIdRegex.source + / assisted killing /.source + SteamIdRegex.source)
	}
}
// "AttackerName<10><STEAM_1:1:1234><TERRORIST>" [-1115 -582 -135] attacked "VictimName<15><STEAM_1:0:12412><CT>" [-1274 -1333 -171] with "ak47" (damage "108") (damage_armor "15") (health "0") (armor "70") (hitgroup "head")
export class AttackedType extends SrcdsLog {
	public AttackingPlayer: Player;
	public AttackingLocation: Vector;
	public VictimPlayer: Player;
	public VictimLocation: Vector;
	public DamageAmount: number;
	public DamageArmourAmount: number;
	public RemainingHealth: number;
	public RemainingArmour: number;
	public HitGroup: string;
	public Weapon: string;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.AttackingPlayer = new Player(data[1]);
		this.AttackingLocation = new Vector(data[2],data[3],data[4]);
		this.Type = "Attacked";
		this.VictimPlayer = new Player(data[5]);
		this.VictimLocation = new Vector(data[6], data[7], data[8]);
		this.Weapon = data[9];
		this.DamageAmount = parseInt(data[10]);
		this.DamageArmourAmount = parseInt(data[11]);
		this.RemainingHealth = parseInt(data[12]);
		this.RemainingArmour = parseInt(data[13]);
		this.HitGroup = data[14];
	}
	static Identifier: RegexAssignment = {
		regex: new RegExp(/^/.source
			+ SteamIdRegex.source
			+ / /.source
			+ VectorRegex.source
			+ / attacked /.source
			+ SteamIdRegex.source
			+ / /.source
			+ VectorRegex.source
			+ / with "(\S+)" \(damage "(\d+)"\) \(damage_armor "(\d+)"\) \(health "(\d+)"\) \(armor "(\d+)"\) \(hitgroup "(.+)"\)$/.source
			)
	}
}

export enum ConnectionActions {
	Connected = 1,
	Disconnected,
	EnteredGame,
	Unknown,
}

// "PlayerName<20><STEAM_1:0:123123><>" connected, address ""
// "Erik<18><BOT><CT>" disconnected (reason "Kicked by Console")
// "eNvy<12><STEAM_1:0:49461278><>" entered the game
export class ConnectionType extends SrcdsLog {
	public Player: Player;
	public Action: ConnectionActions;
	public Reason: string;
	public Address: string;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Player = new Player(data[1]);
		switch (data[2]) {
			case 'connected': this.Address = data[3]; this.Action = ConnectionActions.Connected; break;
			case 'disconnected': this.Reason = data[3]; this.Action = ConnectionActions.Disconnected; break;
			case 'entered': this.Action = ConnectionActions.EnteredGame; break;
		}
		
		this.Type = "Connection";
	}
	static Identifier: RegexAssignment[] = [
	{
		regex: new RegExp(/^/.source + SteamIdRegex.source + / (connected), address "(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3})?"$/.source )
	},
	{
		regex: new RegExp(/^/.source + SteamIdRegex.source + / (disconnected) \(reason "(.+)"\)$/.source )
	},
	{
		regex: new RegExp(/^/.source + SteamIdRegex.source + / (entered) the game$/.source )
	}]
}

// "AttackerName<5><STEAM_1:1:121234><TERRORIST>" [-239 -285 1614] killed "VictimName<11><STEAM_1:0:1234><CT>" [184 -991 1639] with "ak47" (headshot)
export class KilledType extends SrcdsLog {
	public AttackingPlayer: Player;
	public AttackingLocation: Vector;
	public VictimPlayer: Player;
	public VictimLocation: Vector;
	public Weapon: string;
	public How: string;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.AttackingPlayer = new Player(data[1]);
		this.AttackingLocation = new Vector(data[2],data[3],data[4]);
		this.Type = "Killed";
		this.VictimPlayer = new Player(data[5]);
		this.VictimLocation = new Vector(data[6], data[7], data[8]);
		this.Weapon = data[9];
		this.How = data[10];
	}
	static Identifier: RegexAssignment = {
		regex: new RegExp(
			/^/.source 
			+ SteamIdRegex.source 
			+ / /.source 
			+ VectorRegex.source 
			+ / killed(?: other)? /.source 
			+ SteamIdRegex.source 
			+ / /.source 
			+ VectorRegex.source 
			+ / with "(\S+)"(?: \((.+)\))?$/.source
			)
	}
}

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
export class PlayerTriggeredType extends SrcdsLog {
	public EventType: PlayerTriggerType;
	public Player: Player;
	public Value: string;

	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Type = "PlayerTriggered";
		this.Player = new Player(data[1]);
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
	static Identifier: RegexAssignment[] = [{
		regex: new RegExp(/^/.source + SteamIdRegex.source + / triggered "(\S+)"(?: \(value "(.*)"\))?$/.source)
	},
	{
		regex: new RegExp(/^/.source + SteamIdRegex.source + / triggered "(\S+)" on "(\S+)"$/.source)
	}]
}

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

// rcon from "123.42.51.2:49987": command "say where are potatoes"
export class RconType extends SrcdsLog {
	public CommandSourceAddress: string;
	public Command: string;

	constructor(time: moment.Moment, data: RegExpExecArray) {
		super(time);
		this.CommandSourceAddress = data[1];
		this.Command = data[2];
		this.Type = "Rcon";
	 }
	 static Identifier: RegexAssignment = {
	 	regex: /^rcon from "(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5})": command "(.+)"$/
	 }

}

// "PlayerName<8><STEAM_1:0:12345><TERRORIST>" say "god bless KS"
export class SayType extends SrcdsLog {
	public Player: Player;
	public Message: string;
	public To: string;
	constructor(time: moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Player = new Player(data[1]);
		this.To = data[2];
		this.Message = data[3];
		this.Type = "Say";
	}
	static Identifier: RegexAssignment = {
		regex: new RegExp(/^/.source + SteamIdRegex.source + / (say|say_team) "(.+)"$/.source)
	}
}

// Team "TERRORIST" scored "8" with "5" players
export class ScoredType extends SrcdsLog {
	public Team: Team;
	public Score: number;
	public PlayerCount: number;
	constructor(time: moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Type = "Scored";
		this.Team = getTeam(data[1]);
		this.Score = parseInt(data[2]);
		this.PlayerCount = parseInt(data[3]);
	}
	static Identifier: RegexAssignment = {
		regex: new RegExp(/^Team /.source + TeamRegex.source + / scored "(\d+)" with "(\d+)" players$/.source)
	}
}

// server_cvar: "sv_deadtalk" "0"
// "mp_fraglimit" = "0"
export class ServerCvarType extends SrcdsLog {
	public Cvar: string;
	public Value: any;
	constructor(time: moment.Moment, data: RegExpExecArray, extraArg: string) {
		super(time);
		this.Cvar = data[1];
		this.Value = data[2];
		this.Type = "ServerCvar";
	}
	static Identifier: RegexAssignment[] = [{
		regex: /^server_cvar: "(\S+)" "(.*)"$/,
		extraArg: 'servercvar'
	},
	{
		regex: /^"(\S+)" = "(.*)"$/,
		extraArg: 'equals'
	}]
}

export enum ServerEvents {
	MapLoading = 1,
	MapStarted,
	LogFileOpened,
	LogFileClosed,
	ServerMessage,
	Unknown
}

// Loading map "de_dust2"
// Started map "de_cache" (CRC "2087624451")
// Log file started (file "logfiles/L045_032_189_127_27015_201606090953_001.log") (game "/home/csgoserver/serverfiles/csgo") (version "6408")
// Log file closed
// server_message: "quit"
// server_message: "restart"
export class ServerEventType extends SrcdsLog {
	public EventType: ServerEvents;
	public Data: any;
	constructor(time: moment.Moment, data: RegExpExecArray, extraArg: string) {
		super(time);
		this.Type = "ServerEvent";
		
		switch (extraArg) {
			case 'loadingmap':
				this.EventType = data[1] == 'Loading' ? ServerEvents.MapLoading : ServerEvents.MapStarted;
				this.Data = {
					Map: data[2],
					CRC: data[3]
				};
				break;
			case 'logopen':
				this.EventType = ServerEvents.LogFileOpened;
				this.Data = {
							file: data[1],
							game: data[2],
							version: data[3],
						};
				break;
			case 'logclosed':
				this.EventType = ServerEvents.LogFileClosed;
				break;
			case 'server_message':
				this.EventType = ServerEvents.ServerMessage;
				this.Data = data[1];
				break;
			default: throw `invalid extraArg supplied to ServerEventType - ${extraArg}`;
		}
	}
	static Identifier: RegexAssignment[] = [{
		regex: /^(Loading|Started) map "(.+)"(?: \(CRC "([-\d]+)"\))?$/,
		extraArg: 'loadingmap'
	},{
		regex: /^Log file started \(file "(\S+)"\) \(game "(\S+)"\) \(version "(\S+)"\)$/,
		extraArg: 'logopen'
	},{
		regex: /^Log file closed$/,
		extraArg: 'logclosed'
	},{
		regex: /^server_message: "(.+)"$/,
		extraArg: 'server_message'
	},
	]
}

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

// "PlayerName<10><STEAM_1:1:123124><TERRORIST>" [-1117 2465 -72] committed suicide with "world"
export class SuicideType extends SrcdsLog {
	public Player: Player;
	public At: Vector;
	public With: string;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Player = new Player(data[1]);
		this.At = new Vector(data[2],data[3], data[4]);
		this.With = data[5];
		this.Type = "Suicide";
	}
	static Identifier: RegexAssignment = {
		regex: new RegExp("^" + SteamIdRegex.source + " " + VectorRegex.source + / committed suicide with "(.+)"$/.source)
	}
}

// "PlayerName<21><STEAM_1:0:123123>" switched from team <Unassigned> to <Spectator>
export class SwitchedType extends SrcdsLog {
	public Player: Player;
	public FromTeam: Team;
	public ToTeam: Team;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);

		this.Player = new Player(data[1]);
		this.FromTeam = getTeam(data[2]);
		this.ToTeam = getTeam(data[3]);
		this.Type = "Switched";
	}

	static Identifier: RegexAssignment = {
		regex: new RegExp("^" + SteamIdRegex.source + " switched from team " + TeamRegex.source + " to " + TeamRegex.source + "$")
	}
}

// Team playing "CT": blarhg
export class TeamNameType extends SrcdsLog {
	public Team: Team;
	public Name: string;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Team = getTeam(data[1]);
		this.Name = data[2];
		this.Type = "TeamName";
	}

	static Identifier: RegexAssignment = {
		regex: new RegExp(/^Team playing /.source + TeamRegex.source + /: (.+)$/.source),
	}
}

export enum TeamTriggerType {
	SFUI_Notice_Terrorists_Win = 1,
	SFUI_Notice_CTs_Win,
	SFUI_Notice_Target_Bombed,
	SFUI_Notice_Target_Saved,
	SFUI_Notice_Bomb_Defused,
	Unknown = -1,
}

// Team "TERRORIST" triggered "SFUI_Notice_Target_Bombed" (CT "14") (T "14")
export class TeamTriggeredType extends SrcdsLog {
	public EventType: TeamTriggerType;
	public Team: Team;
	public TerroristScore: number;
	public CounterTerroristScore: number;

	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Type = "TeamTriggered";
		let eventType:string;

		this.Team = getTeam(data[1]);
		eventType = data[2];
		this.TerroristScore = parseInt(data[4]);
		this.CounterTerroristScore = parseInt(data[3]);
		
		// todo: I though typescript supported string indexes on enums
		switch (eventType) {
			case 'SFUI_Notice_Terrorists_Win': this.EventType = TeamTriggerType.SFUI_Notice_Terrorists_Win; break;
			case 'SFUI_Notice_CTs_Win': this.EventType = TeamTriggerType.SFUI_Notice_CTs_Win; break;
			case 'SFUI_Notice_Target_Bombed': this.EventType = TeamTriggerType.SFUI_Notice_Target_Bombed; break;
			case 'SFUI_Notice_Target_Saved': this.EventType = TeamTriggerType.SFUI_Notice_Target_Saved; break;
			case 'SFUI_Notice_Bomb_Defused': this.EventType = TeamTriggerType.SFUI_Notice_Bomb_Defused; break;
			default: this.EventType = TeamTriggerType.Unknown; console.error("Unknown team trigger event type: ", eventType); break;
		}
	}

	static Identifier: RegexAssignment = {
		// Team "TERRORIST" triggered "SFUI_Notice_Target_Bombed" (CT "14") (T "14")
		regex: new RegExp("^Team " + TeamRegex.source + / triggered "(\S+)" \(CT "(\d+)"\) \(T "(\d+)"\)$/.source),
	}
}

// "SomePlayer<9><STEAM_1:0:123455><CT>" threw smokegrenade [198 -683 1616]
export class ThrewType extends SrcdsLog {
	public ItemThrown: string;
	public Player: Player;
	public ThrownFrom: Vector;
	constructor(time:moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Player = new Player(data[1]);
		this.ItemThrown = data[2];
		this.ThrownFrom = new Vector(data[3],data[4], data[5]);
		this.Type = "Threw";
	}

	static Identifier: RegexAssignment = {
		// "SomePlayer<9><STEAM_1:0:123455><CT>" threw smokegrenade [198 -683 1616]
		regex: new RegExp("^" + SteamIdRegex.source + / threw (\w+) /.source + VectorRegex.source + /$/.source),
	}
}

// "PlayerName<8><STEAM_1:0:123124124><>" STEAM USERID validated
// STEAMAUTH: Client Some Username goes here received failure code 6
export class ValidatedType extends SrcdsLog {
	public Player: Player | string;
	public Success: Boolean;
	public ErrorCode: number;
	constructor(time:moment.Moment, data: RegExpExecArray, messageType: string) {
		super(time);
		this.Type = "Validated";

		if (messageType == 'valid') {
			this.Player = new Player(data[1]);
			this.Success = true;
		} else if (messageType == 'failed') {
			this.Player = data[1];
			this.Success = false;
			this.ErrorCode = parseInt(data[2]);
		} else {
			throw "invalid"
		}
	}

	static Identifier: RegexAssignment[] = [
	{
		// "PlayerName<8><STEAM_1:0:123124124><>" STEAM USERID validated
		regex: new RegExp("^" + SteamIdRegex.source + / STEAM USERID validated$/.source),
		extraArg: 'valid'
	},
	{
		// STEAMAUTH: Client Some Username goes here received failure code 6
		regex: /^STEAMAUTH: Client (.+) received failure code (\d*)/,
		extraArg: 'failed',
	}
	];
}

//06/09/2016 - 10:07:18: [WarMod_BFG] {"timestamp": "2016-06-09 10:07:18", "event": "knife_player_say", "round": 1, "player": {"name": "...", "userId": 14, "uniqueId": "STEAM_1:1:", "team": 3}, "message": ".ready", "teamOnly": 0}
export class WarmodType extends SrcdsLog {
	public Payload: any;
	constructor(time: moment.Moment, data: RegExpExecArray) {
		super(time);
		this.Payload = JSON.parse(data[1]);
		this.Type = "Warmod";
	}

	static Identifier: RegexAssignment = {
		//06/09/2016 - 10:07:18: [WarMod_BFG] {"timestamp": "2016-06-09 10:07:18", "event": "knife_player_say", "round": 1, "player": {"name": "...", "userId": 14, "uniqueId": "STEAM_1:1:", "team": 3}, "message": ".ready", "teamOnly": 0}
		regex: /^\[WarMod_BFG\] (.+)$/,
	}
}

interface ConstructableType {
	new(time:moment.Moment, data: RegExpExecArray, extraArg?: any): ISrcdsLog;
	Identifier: RegexAssignment | RegexAssignment[];
}



interface RegexAssignment {
	regex: RegExp;
	//class: ConstructableType; //(time:moment.Moment, data: RegExpExecArray, extraArg?: any) => void;
	extraArg?: any;
}

SrcdsLog.Constructors = <[{regex: RegexAssignment, cons: ConstructableType}]>[];

			// TODO: move all types out to own files, and build this list from require()s once
			var types: ConstructableType[] = [
				AssistType,
				AttackedType,
				ConnectionType,
				KilledType,
				PlayerNameType,
				PlayerTriggeredType,
				PurchasedType, 
				RconType, 
				SayType, 
				ScoredType, 
				ServerCvarType, 
				ServerEventType, 
				SpawnedType, 
				SuicideType, 
				SwitchedType, 
				TeamNameType, 
				TeamTriggeredType, 
				ThrewType, 
				ValidatedType, 
				WarmodType,
			];
			types.forEach((t) => {
				if (Array.isArray(t.Identifier)) {
					(<RegexAssignment[]>t.Identifier).forEach((i) => {
						SrcdsLog.Constructors.push({regex: i, cons: t});
					})
				} else {
					SrcdsLog.Constructors.push({
						regex: (<RegexAssignment>t.Identifier),
						cons: t
					})
				}
			});
