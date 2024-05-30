export interface ILoginUser{
    username:string;
    password:string;
}

export interface IRegisterUser{
    username:string;
    password:string;
    role?:string
}

export interface ILoginResponse{
    data:{
        accessToken:string,
        refreshToken:string,
        userName:string,
        userId:number
    },
    message:string,
    success:boolean
}

export interface IRevokeRefreshToken{
    userName:string;
    refreshToken:string;
}