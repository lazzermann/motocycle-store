import 'tailwindcss/tailwind.css'

import React from 'react'
import { AppProps } from 'next/app';
import wrapper, { SagaStore } from '../redux/store';
import { END } from 'redux-saga';
import { isEmpty } from '../src/common'
import {setSSRData, getIdentity, updateIdentity} from '../redux/models/actions'

function MyApp({ Component, pageProps }: AppProps) {
    return (<Component {...pageProps} />);
}

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async ({ Component, ctx }) => {

    
    (store as SagaStore).runSaga();


    if (ctx.req && ctx.req['ssrData'] !== undefined && !isEmpty(ctx.req['ssrData'])) {
        store.dispatch(setSSRData({ data: ctx.req['ssrData']}));
    }

    if (ctx.req && ctx.req['identity'] !== undefined && !isEmpty(ctx.req['identity'])) {
        console.log('Identity', ctx.req)
        store.dispatch(updateIdentity({ user: ctx.req['identity']}));
    }

    console.log('props', Component.getInitialProps)
    const pageProps = {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        namespacesRequired: ['common']
    };

    if (store && ctx.req) {
        store.dispatch(END);
        await (store as SagaStore).sagaTask.toPromise();
    }

    return {
        pageProps
    };
});

export default wrapper.withRedux(MyApp);