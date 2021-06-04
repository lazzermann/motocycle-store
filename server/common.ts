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
}