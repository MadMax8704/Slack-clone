export class Channels {
    public message: string[] = [];
    public channelName: string[] = [];
    public channelId: string []= [];
    public userName: string [] = [];
    public userPhoto: string [] = [];

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
            userName: this.userName,
            userPhoto: this.userPhoto
        };
    }
}
