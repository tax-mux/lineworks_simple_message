
import axios from 'axios';
import dotenv from 'dotenv';
import { debugLog, getAccessToken } from 'lineworks_jwt';

dotenv.config();

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

export {
    getAccessToken,
    sendMessage
};
