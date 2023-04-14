export class Thread {
    public message: string[] = [];
    public userName: string [] = [];
    public userPhoto: string [] = [];
    public userEmail: string [] = [];
    public messagetime = [];
    constructor() {
    }

    public toJson(){
        return {
            message: this.message,
            userName: this.userName,
            userPhoto: this.userPhoto,
            userEmail: this.userEmail,
            messagetime: this.messagetime
        };
    }
}
