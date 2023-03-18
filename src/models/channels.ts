export class Channels {
    public message: string[] = [];

    constructor() {
    }

    public toJson(){
        return {
            message: this.message
        };
    }
}
