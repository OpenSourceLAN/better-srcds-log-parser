import SrcdsLogType = require("./SrcdsLog");
import Globals = require("../globals");
import Unknown = require("./UnknownType")

export interface ISrcdsLog {
	Time: moment.Moment;
	Type: string;
}

export class SrcdsLog implements ISrcdsLog {
	public Time: moment.Moment;
	public Type: string;
	public static Constructors: [{regex: Globals.RegexAssignment, cons: Globals.ConstructableType}];

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
			return new Unknown.UnknownType(time, rawMessage);
	}
}