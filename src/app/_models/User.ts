export  interface  User {

    username: string;
    jwtToken: string;
    enabled: boolean;
    registerDate: Date;
    accountExpire: Date;
}