import 'tailwindcss/tailwind.css'

import React from 'react'
import { AppProps } from 'next/app';
import wrapper, { SagaStore } from '../redux/store';
import { END } from 'redux-saga';


function MyApp({ Component, pageProps }: AppProps) {
    return (<Component {...pageProps} />);
}

MyApp.getInitialProps = wrapper.getInitialAppProps(store => async ({ Component, ctx }) => {

    //async ({ Component, ctx }: AppContext) => {
    (store as SagaStore).runSaga();

    console.log('props', Component.getInitialProps)
    // 1. Wait for all page actions to dispatch
    const pageProps = {
        ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
        namespacesRequired: ['common']
    };

    // 2. Stop the saga if on server
    if (store && ctx.req) {
        store.dispatch(END);
        await (store as SagaStore).sagaTask.toPromise();
    }

    // 3. Return props
    return {
        pageProps
    };
});

export default wrapper.withRedux(MyApp);