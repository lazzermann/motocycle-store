export enum UserRole{
    admin = 'admin',
    user = 'user',
    guest = 'guest'
}

export interface Identity {
    userId: any
    firstName: string
    lastName: string
    email: string
    token?: string
    role: UserRole
    image: string
}

export const isEmpty = (obj) => Object.keys(obj).length === 0 && obj.constructor === Object;
