const merge = require('lodash/merge');

if (typeof document !== 'undefined') {
    throw new Error('Do not import `config.js` from inside the client-side code.');
}


const isDev = process.env.NODE_ENV !== 'production';


const prodConfig = {
    siteName: 'Motorcycle-store',
    baseUrl: process.env.BASE_URL,
    jwtSecret : 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTYyMjgxMjY4NiwiaWF0IjoxNjIyODEyNjg2fQ.zrcW6DJ9pTghMujqdFuBELFijFv5Jioymh99lAPLyjs',
    dev: isDev,
    debug_mode: process.env.DEBUG_MODE,
 mongo: {
        uri: process.env.MONGO_URL|| 'mongodb+srv://lazer:lazer@test.b1h2b.mongodb.net/prodBase?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            poolSize: 10, // Maintain up to 10 socket connections
            bufferMaxEntries: 0
        }
    },
}


let localConfig = {};
// if (isDev) {
//     try {
//         localConfig = require('./config.local.js');
//     } catch (ex) {
//         console.log('ex', ex)
//         console.log('config.local does not exist.');
//     }
// }

module.exports = prodConfig;

//module.exports = merge(prodConfig, localConfig);