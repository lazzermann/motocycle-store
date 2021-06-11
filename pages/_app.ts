import 'tailwindcss/tailwind.css'
import React, {FC} from 'react';
import {AppProps} from 'next/app';
import wrapper from '../redux/store';

// export default function App({ Component, pageProps }) {
//   return <Component {...pageProps} />
// }

const WrappedApp: FC<AppProps> = ({Component, pageProps}) => {
    <Component {...pageProps} />
}

export default wrapper.withRedux(WrappedApp)