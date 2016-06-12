import fs = require('fs');
var process = require("process");
import lp = require("./index");

var fileContents = fs.readFileSync(process.argv[2]).toString().split("\n");
var parser = new lp.SrcdsLogParser();

var seenTypes: any = {};

for (var i = 1000; i < Math.min(50000, fileContents.length); i++) {
//	try {
	let o = parser.parseLine(fileContents[i]);
	// if (o.Type == "Unknown" ) {
	// 	console.log(o);
	// }
	if (!seenTypes[o.Type]) {
		seenTypes[o.Type] = o;
	}

// } catch (e) {
// 	console.log("error:", fileContents[i]);
// 	console.log(e);
	
// }
}

console.log(JSON.stringify(seenTypes, null, 4));
