import * as moment from "moment";
import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
// rcon from "123.42.51.2:49987": command "say where are potatoes"
export class RconType extends SrcdsLogType.SrcdsLog {
	public CommandSourceAddress: string;
	public Command: string;

	constructor(time: moment.Moment, data: RegExpExecArray) {
		super(time);
		this.CommandSourceAddress = data[1];
		this.Command = data[2];
		this.Type = "Rcon";
	 }
	 static Identifier: Globals.RegexAssignment = {
	 	regex: /^rcon from "(\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}:\d{1,5})": command "(.+)"$/
	 }

}