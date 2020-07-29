export class UserDto {
    readonly _id:string;
    readonly username: string;
    readonly password: string;
    readonly nickmane: string;
    readonly task_id: string;
}

export class UserLogin{
    readonly username: string;
    readonly password:string;
}