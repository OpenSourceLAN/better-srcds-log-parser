import * as moment from "moment";
import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");

export interface ISrcdsLog {
	Time: moment.Moment;
	Type: string;
}

export class SrcdsLog implements ISrcdsLog {
	public Time: moment.Moment;
	public Type: string;
	public static Constructors: [{regex: Globals.RegexAssignment, cons: Globals.ConstructableType}];

	constructor(time: moment.Moment) {
		this.Time = time;
	}
}

export class UnknownType extends SrcdsLogType.SrcdsLog {
	public Content: string;
	constructor(time: moment.Moment, rawMessage: string) {
		super(time);
		this.Content = rawMessage;
		this.Type = "Unknown";
	 }

}