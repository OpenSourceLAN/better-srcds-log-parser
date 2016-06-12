import e = require("events");
import moment = require("moment");
import t = require("./Types/SrcdsLog");
import Globals = require("./globals");
import AssistType = require('./Types/AssistType');
import AttackedType = require('./Types/AttackedType');
import ConnectionType = require('./Types/ConnectionType');
import KilledType = require('./Types/KilledType');
import PlayerNameType = require('./Types/PlayerNameType');
import PlayerTriggeredType = require('./Types/PlayerTriggeredType');
import PurchasedType = require('./Types/PurchasedType');
import RconType = require('./Types/RconType');
import SayType = require('./Types/SayType');
import ScoredType = require('./Types/ScoredType');
import ServerCvarType = require('./Types/ServerCvarType');
import ServerEventType = require('./Types/ServerEventType');
import SpawnedType = require('./Types/SpawnedType');
import SrcdsLogType = require('./Types/SrcdsLog');
import SuicideType = require('./Types/SuicideType');
import SwitchedType = require('./Types/SwitchedType');
import TeamNameType = require('./Types/TeamNameType');
import TeamTriggeredType = require('./Types/TeamTriggeredType');
import ThrewType = require('./Types/ThrewType');
import UnknownType = require('./Types/UnknownType');
import ValidatedType = require('./Types/ValidatedType');
import WarmodType = require('./Types/WarmodType');

let lengthOfDate: number = "06/09/2016 - 10:07:28: ".length;

export class SrcdsLogParser {
	parseLine(line:string) : t.ISrcdsLog {
		let date = this.getDate(line.slice(0, lengthOfDate - 2));
		
		return t.SrcdsLog.getIt(date, line.slice(lengthOfDate));
	}

	private getDate(dateTokens: string) : moment.Moment {
		// Assumption: date format is always the same - 06/09/2016 - 10:07:28
		let m =  moment(dateTokens, "MM/DD/YYYY - HH:mm:ss", true);
		if (m.isValid() == false) {
			console.error("Invalid date: ", dateTokens);
		}
		return m;
	}

	private getInstanceOf(time: moment.Moment, rawMessage: string) : SrcdsLogType.ISrcdsLog  {

		var returnValue: SrcdsLogType.ISrcdsLog;

		constructors.forEach((v) => {
			let regexResult = v.regex.regex.exec(rawMessage);
			if (regexResult) {
				returnValue = new v.cons(time, regexResult, v.regex.extraArg);
			}
		});

		if (returnValue) 
			return returnValue;
		else
			return new UnknownType.UnknownType(time, rawMessage);
	}
}

/***
 * Each class has one or more regexes that we can parse to get a value for it. 
 * We build the list of all available classes and their regexes here. 
 */
var constructors = <[{regex: Globals.RegexAssignment, cons: Globals.ConstructableType}]>[];

var types: Globals.ConstructableType[] = [
	AssistType.AssistType,
	AttackedType.AttackedType,
	ConnectionType.ConnectionType,
	KilledType.KilledType,
	PlayerNameType.PlayerNameType,
	PlayerTriggeredType.PlayerTriggeredType,
	PurchasedType.PurchasedType,
	RconType.RconType,
	SayType.SayType,
	ScoredType.ScoredType,
	ServerCvarType.ServerCvarType,
	ServerEventType.ServerEventType,
	SpawnedType.SpawnedType,
	SuicideType.SuicideType,
	SwitchedType.SwitchedType,
	TeamNameType.TeamNameType,
	TeamTriggeredType.TeamTriggeredType,
	ThrewType.ThrewType,
	ValidatedType.ValidatedType,
	WarmodType.WarmodType,
];
types.forEach((t) => {
	if (Array.isArray(t.Identifier)) {
		(<Globals.RegexAssignment[]>t.Identifier).forEach((i) => {
			constructors.push({regex: i, cons: t});
		})
	} else {
		constructors.push({
			regex: (<Globals.RegexAssignment>t.Identifier),
			cons: t
		})
	}
});
