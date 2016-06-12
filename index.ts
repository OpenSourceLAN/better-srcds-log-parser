import e = require("events");
import moment = require("moment");
import t = require("./types");

let lengthOfDate: number = "06/09/2016 - 10:07:28: ".length;
/** 

 Edge cases - 

 When a map starts, there's a log line that says "server cvars start", followed by lines of `{cvar name} = {cvar value}`
 This section finishes at "server cvars end"


 */
export class SrcdsLogParser /*extends e.EventEmitter*/ {
	constructor() {
		//super();
	}

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
}

function splitIgnoringEmpty(input: string, split: string) {
	return input.split(split).filter((i) => { return i !== ''});
}

function isEven(i: number) { return i % 2 == 0 };

