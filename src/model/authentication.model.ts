export class AuthenticationState {
    accessToken: string = "";
    refreshToken: string = "";
}
export class AuthenticationResponse {
        accessToken: string = "";
        refreshToken: string = "";
        success: boolean = false;
        error?: string = "";
}