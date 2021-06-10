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


export const IGNORS = [
    '/favicon.ico',
    '/_next',
    '/static',
    '/sitemap.xml',
    '/robots.txt',
    '/service-worker.js',
    '/manifest.json',
    '/styles.chunk.css.map',
    '/__nextjs',
]