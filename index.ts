import e = require("events");
import moment = require("moment");
import t = require("./types");

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
}
