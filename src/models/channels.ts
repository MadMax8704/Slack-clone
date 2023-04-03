export class Channels {
    public message: string[] = [];
    public channelName: string[] = [];
    public channelId: string []= [];
    public uid: string [] = [];

    constructor() {
    }

    public toJson(){
        return {
            message: this.message,
            channelName: this.channelName,
            channelId: this.channelId
        };
    }


    public  messageToJson(){
        return {
            message: this.message,
            uid: this.uid
        };
    }
}
