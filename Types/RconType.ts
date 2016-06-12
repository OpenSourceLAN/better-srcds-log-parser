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