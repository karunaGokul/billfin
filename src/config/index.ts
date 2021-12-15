export class Settings {
    public static ApiUrl: string = process.env.VUE_APP_APIBASEURL;
    public static ApiPath: string = process.env.VUE_APP_APIPATH;
    public static ApiJson: any = process.env.VUE_APP_JSON_FILE;
}