export class Settings {
    public static ApiUrl: string = process.env.VUE_APP_APIBASEURL;
    public static ApiPath: string = process.env.VUE_APP_APIPATH;
    public static timeLimit: number = 10;
}