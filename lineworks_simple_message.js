require('dotenv').config();
const jwt = require("jsonwebtoken");
const request = require('request');
const axios = require('axios');

/**
 * デバッグモードの時にログを出力する。
 * @param {*} message 
 */
async function debugLog(message){
    if(process.env.DEBUG_MODE==="True"){
        console.log(message);
    }
}

/**
 * jwtでアクセストークンを取得する。
 * privatekeyはprivatekey.penを読み込む。
 * ハッシュアルゴリズムはRS256を用いる。
 * @return {string} アクセストークン
 */
async function getAccessToken(){
    let jwtHeader = { "alg": "RS256", "typ": "JWT" };
    debugLog("JWT_HEADER:");
    debugLog(JSON.stringify(jwtHeader));
    debugLog();

    let jwtClaimSet = {
        "iss": process.env.LINEWORKS_CLIENT_ID,
        "sub": process.env.LINEWORKS_SERVICE_ACCOUNT_ID,
        "iat": Math.floor(Date.now() / 1000),
        "exp": Math.floor(Date.now() / 1000) + 60 * 60
    };

    debugLog("JWT_CLAIMSET:");
    debugLog(JSON.stringify(jwtClaimSet));
    debugLog();

    let private_key = require('fs').readFileSync('privatekey.pem', 'utf8');

    let assertion = jwt.sign(jwtClaimSet, private_key, { algorithm: 'RS256', header: jwtHeader});
    debugLog("ASSERTION:");
    debugLog(assertion);
    debugLog();

    // LineworksにPOSTし、アクセストークンを取得する。
    let options = {
        url: 'https://auth.worksmobile.com/oauth2/v2.0/token',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        form: {
            "assertion": assertion,
            "grant_type": "urn:ietf:params:oauth:grant-type:jwt-bearer",
            "client_id": process.env.LINEWORKS_CLIENT_ID,
            "client_secret": process.env.LINEWORKS_CLIENT_SECRET,
            "scope": process.env.LINEWORKS_SCOPE
        }
    };
    debugLog("POST_OPTIONS:");
    debugLog(JSON.stringify(options));
    debugLog();
    return new Promise((resolve, reject) => {
        request.post(options, (error, response, body) => {
            debugLog("POST_RESPONSE:");
            debugLog(JSON.stringify(response));
            debugLog();
            if (error) {
                reject(error);
            } else {
                debugLog("POST_BODY:");
                debugLog(body);
                debugLog();
                resolve(JSON.parse(body).access_token);
            }
        });
    });
}

async function modifyMessage(message) {
    let newMessage = message;
    newMessage = newMessage.replace(/\\n/g, "\n"); // 改行コードを置換
    return newMessage;
}

/**
 * メッセージを送信する。
 * @param {*} from 
 * @param {*} to 
 * @param {*} message 
 */
async function sendMessage(to, message) {
    message = await modifyMessage(message);
    let accessToken = await getAccessToken();
    let apiUrl = `https://www.worksapis.com/v1.0/bots/${process.env.LINEWORKS_BOT_NO}/users/${to}/messages`;

    const data = {
        "accountId": process.env.LINEWORKS_SERVICE_ACCOUNT_ID,
        "content": {
            "type": "text",
            "text": message
        }
    };
 
    const headers = {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${accessToken}`
    };
    debugLog(apiUrl);
    debugLog(headers);
    try {
        const response = await axios.post(apiUrl, data, { headers: headers });
        console.log(response.status);
    } catch (error) {
        console.error(error);
    }
}

module.exports = {
    getAccessToken,
    sendMessage
};