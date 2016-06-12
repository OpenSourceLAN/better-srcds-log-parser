import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
export class UnknownType extends SrcdsLogType.SrcdsLog {
	public Content: string;
	constructor(time: moment.Moment, rawMessage: string) {
		super(time);
		this.Content = rawMessage;
		this.Type = "Unknown";
	 }

}