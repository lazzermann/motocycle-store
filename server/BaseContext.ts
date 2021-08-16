import { IContextContainer } from './container';

declare global {
    // eslint-disable-next-line @typescript-eslint/no-namespace
    namespace Express {
        interface Response {
            answer: (data: any, message?: any, status?: number) => void;
            print: (pathName: string, ssrData: any) => void
        }

        interface Request {
            ssrData: any
        }
    }
}

export default class BaseContext {
    protected di: IContextContainer;

    constructor(opts: IContextContainer) {
        this.di = opts;
    }
}