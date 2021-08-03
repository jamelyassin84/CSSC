export type Admin = {
    username:string,
    password:string,
    name:string,
    position:string,
    campus:string,
    type:AdminType,
}

enum AdminType {
    SuperAdmin = 'Super Admin',
    Admin = "Administrator"
}