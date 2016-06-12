
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