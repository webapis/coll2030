
//const KEYPATH ='./turkmenistan-market-f1b9872438ea.json'



    (async () => {
        const { getGoogleToken } = require('./google/google.oauth')
        const token =await getGoogleToken()

        debugger;
        const token1 =await getGoogleToken()


        debugger;
    })()

// (async () => {

//     const {getSheetValues}=require('./google.sheet')


//     const { google } = require('googleapis')
//     const privatedata = require('./encdata/turkmenistan-market-f1b9872438ea.json')
//     const scopes = ['https://www.googleapis.com/auth/drive', 'https://www.googleapis.com/auth/drive.appdata', 'https://www.googleapis.com/auth/drive.file', 'https://www.googleapis.com/auth/drive.metadata']

//     const auth = new google.auth.GoogleAuth({ keyFile: './encdata/turkmenistan-market-f1b9872438ea.json', scopes })
//     debugger;

//     const accesstoken = await auth.getAccessToken()
//     const idtoken =await auth.getIdTokenClient()
//    // const data =await getSheetValues({access_token:accesstoken,spreadsheetId:'12cHWbmP0c4cQaYzycxgmWj_n99JDU_r2obtn4nkznrA',range:'Sheet1!A1'})

//     debugger;
// })()

// const  google =require('googleapis')
// const googleServiceAccountKey =require('./turkmenistan-market-f1b9872438ea.json') // see docs on how to generate a service account
// debugger;
// const googleJWTClient = new google.Auth.JWT(
//   googleServiceAccountKey.client_email,
//   null,
//   googleServiceAccountKey.private_key,
//   ['https://www.googleapis.com/auth/drive'],
//   null,
// )

// googleJWTClient.authorize((error, access_token) => {
//    if (error) {
//       return console.error("Couldn't get access token", error)
//    }
//    debugger;
//    // ... access_token ready to use to fetch data and return to client
//    // even serve access_token back to client for use in `gapi.analytics.auth.authorize`
// })

// const {JWT} = require('google-auth-library');
// const keys = require('./turkmenistan-market-f1b9872438ea.json');

// async function main() {
//   const client = new JWT({
//     email: keys.client_email,
//     key: keys.private_key,
//     scopes: ['https://www.googleapis.com/auth/drive'],
//   })
//   debugger;
//   const tkn =await client.getAccessToken()
//   debugger;
//   const url = `https://dns.googleapis.com/dns/v1/projects/${keys.project_id}`;
//   const res = await client.request({url});
//   console.log(res.data);
// }

//main().catch(console.error);
// const fs =require('fs')
// var jwt = require('jsonwebtoken');
// var privateKey = require('./turkmenistan-market-f1b9872438ea.json',{encoding:'utf-8'});

// jwt.sign({ foo: 'bar' },privateKey.private_key , { algorithm: 'RS256' }, function(err, token) {
//     debugger;
//     console.log(token);
//     debugger;
//   });