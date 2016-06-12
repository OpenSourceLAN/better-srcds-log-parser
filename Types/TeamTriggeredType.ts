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