export interface ILoginUser{
    username:string;
    password:string;
}

export interface IRegisterUser{
    username:string;
    password:string;
}

export interface ILoginResponse{
    data:{
        accessToken:string,
        refreshToken:string
    },
    message:string,
    success:boolean
}