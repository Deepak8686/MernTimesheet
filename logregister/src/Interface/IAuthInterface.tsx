export interface IAuthProvider {
    token: string | null;
    isAuthrozied: boolean;
    setToken: (data: any) => void;
}
