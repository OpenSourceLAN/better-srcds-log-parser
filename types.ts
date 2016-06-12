import moment = require("moment");









interface ConstructableType {
	new(time:moment.Moment, data: RegExpExecArray, extraArg?: any): ISrcdsLog;
	Identifier: RegexAssignment | RegexAssignment[];
}



interface RegexAssignment {
	regex: RegExp;
	//class: ConstructableType; //(time:moment.Moment, data: RegExpExecArray, extraArg?: any) => void;
	extraArg?: any;
}

SrcdsLog.Constructors = <[{regex: RegexAssignment, cons: ConstructableType}]>[];

			// TODO: move all types out to own files, and build this list from require()s once
			var types: ConstructableType[] = [
				AssistType,
				AttackedType,
				ConnectionType,
				KilledType,
				PlayerNameType,
				PlayerTriggeredType,
				PurchasedType, 
				RconType, 
				SayType, 
				ScoredType, 
				ServerCvarType, 
				ServerEventType, 
				SpawnedType, 
				SuicideType, 
				SwitchedType, 
				TeamNameType, 
				TeamTriggeredType, 
				ThrewType, 
				ValidatedType, 
				WarmodType,
			];
			types.forEach((t) => {
				if (Array.isArray(t.Identifier)) {
					(<RegexAssignment[]>t.Identifier).forEach((i) => {
						SrcdsLog.Constructors.push({regex: i, cons: t});
					})
				} else {
					SrcdsLog.Constructors.push({
						regex: (<RegexAssignment>t.Identifier),
						cons: t
					})
				}
			});
