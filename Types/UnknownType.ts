export class UnknownType extends SrcdsLog {
	public Content: string;
	constructor(time: moment.Moment, rawMessage: string) {
		super(time);
		this.Content = rawMessage;
		this.Type = "Unknown";
	 }

}