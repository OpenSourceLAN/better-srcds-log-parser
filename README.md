### A better srcds (CS:GO, TF2, etc) Log Parser

A Typescript/Javascript library for reading log files from 
Valve's Source Dedicated Server (srcds), including 
Counter Strike: GO, Counter Strike: Source, Team Fortress 2, 
and so on. 

Presently only the special events for CS:GO have been added
so TF2 will not actually work, but the rest will be added soon. 

More details to come. 

### Usage

```
npm install better-srcds-log-parser
```

Javascript:
```
var fs = require('fs'),
	SrcdsLogParser = require("better-srcds-log-parser").SrcdsLogParser;

var parser = new SrcdsLogParser();

fs.readFileSync("someFilename.log")
	.toString()
	.split("\n")
	.forEach(function(line) {
		console.log(parser.parseLine(line));
	});

```

Typescript:

```
import * as SrcdsLogParser from "better-srcds-log-parser";
import fs = require('fs');

var parser: SrcdsLogParser.SrcdsLogParser = new SrcdsLogParser.SrcdsLogParser();

fs.readFileSync("someFilename.log")
	.toString()
	.split("\n")
	.forEach((line) {
		let parsedLine: SrcdsLogParser.ISrcdsLog = parser.parseLine(line);
		console.log(parsedLine);
	});

```

Both will output something like the following:
```
SwitchedType {
  Player:
   Player {
     Name: 'Some Player Name',
     PlayerID: 21,
     SteamID: 'STEAM_1:0:1234567',
     Team: 4 },
  FromTeam: 3,
  ToTeam: 2,
  Type: 'Switched' }
ServerCvarType { Cvar: 'nextlevel', Value: '', Type: 'ServerCvar' }
PlayerTriggeredType {
  Type: 'PlayerTriggered',
  Player: Player { Name: 'World' },
  Value: 'de_cache',
  EventType: 9 }
PlayerTriggeredType {
  Type: 'PlayerTriggered',
  Player:
   Player {
     Name: 'Some Player Name',
     PlayerID: 21,
     SteamID: 'STEAM_1:0:1234567',
     Team: 2 },
  Value: '',
  EventType: 12 }

```

There are some Enums visible in this output. For example, `EventType` in the
last entry. The enums are exported from the module, and they are:

```
ConnectionActions
PlayerTriggerType
TeamTriggerType
Team
ServerEvents
```

### Example types

See `warmod-types.json` and `srcds-types.json` for, respectively, the log entry types 
that Warmod will emit, and the log entry types that a vanilla CS:GO server will emit. 
Both can be enabled on a server at the same time. 


### License 
GPL 3.0. See LICENSE for more details. 
