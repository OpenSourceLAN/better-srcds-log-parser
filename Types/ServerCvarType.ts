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