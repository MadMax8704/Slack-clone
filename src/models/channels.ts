export class Channels {
    public message: string[] = [];
    public channelName: string[] = [];

    constructor() {
    }

    public toJson(){
        return {
            message: this.message,
            channelName: this.channelName
        };
    }
}
