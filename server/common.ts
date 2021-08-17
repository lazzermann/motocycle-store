export enum UserRole{
    admin = 'admin',
    user = 'user',
    guest = 'guest'
}

// export interface Identity {
//     userId: any
//     firstName: string
//     lastName: string
//     email: string
//     token?: string
//     role: UserRole
//     
// }

export interface IIdentity {
    id: any;
    firstName: string,
    lastName: string,
    email: string;
    token?: string;
    image: string,
    role: UserRole;
}

export interface SagaAction{
    saga : () => void
    trigger : (data : any) => void
}

export interface ISagaAction {
    [entity: string]: {
        [action: string]: {
            saga?: () => void;
            trigger: (data: any) => void;
        },
    };
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

export enum ENTITIES {
    USERS = 'users',
    PRODUCTS = 'products',
    REVIEWS = 'reviews',
    CATEGORIES = 'categories'
}

export enum SCHEMA_ENTITIES{
    USER = 'user',
    PRODUCT = 'product',
    REVIEW = 'reviews',
    CATEGORY = 'category'
}