export class Channels {
    public message: string[] = [];
    public channelName: string[] = [];
    public channelId: string[] = [];
    public userName: string[] = [];
    public userPhoto: string[] = [];
    public userEmail: string[] = [];
    public threadMessage: string[] = [];
    public threadUserName: string[] = [];
    public threadUserPhoto: string[] = [];
    public threadId: string[] = [];

    constructor() {
    }

    public toJson() {
        return {
            message: this.message,
            channelName: this.channelName,
            channelId: this.channelId,
            threadId: this.threadId
        };
    }


    public messageToJson() {
        return {
            message: this.message,
            userName: this.userName,
            userPhoto: this.userPhoto,
            userEmail: this.userEmail,
        };
    }

    public threadToJson() {
        return {
            threadId: this.threadId
        };
    }

}
