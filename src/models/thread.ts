export class Thread {
    public message: string[] = [];
    public userName: string [] = [];
    public userPhoto: string [] = [];
    constructor() {
    }

    public toJson(){
        return {
            message: this.message,
            userName: this.userName,
            userPhoto: this.userPhoto
        };
    }
}