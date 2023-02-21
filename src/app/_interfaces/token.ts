export interface IToken {
    token: string;
}

export interface IDecodedToken {
    exp: number;
    iat: number;
    id: string;
}
