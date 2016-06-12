var RootSteamIdRegex = /".+?\<\d*\>\<(?:STEAM_\d+:\d+:\d+|BOT|Console)\>(?:\<\w*\>)?"/;
var RootChickenRegex = /"chicken\<\d+\>"/;
var SteamIdRegex = new RegExp("(" + RootSteamIdRegex.source + "|World|" + RootChickenRegex.source + ")");
var TeamRegex = /["<]?(CT|TERRORIST|Spectator|Unassigned)[">]?/;
var VectorRegex = /\[?([-.\d]+) ([-.\d]+) ([-.\d]+)\]?/;

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
