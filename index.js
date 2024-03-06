/**
 * Lineworks api v2.0を用いて、シンプルなメッセージを送信する。
 */

// Import the lineworks_simple_message module
require('dotenv').config();
const { sendMessage } = require("./lineworks_simple_message");
const express = require("express");
const app = express();
let to;

app.use(express.json());

app.post("/", async (req, res) => {
    let emoji = (req.body.execution.status=="succeeded")? "🆗" : "🆖";
    let message = `${emoji} Project: ${req.body.execution.project}\nstatus: ${req.body.execution.status}`;
    message += `\n\n${req.body.execution.job.description}`;
    await sendMessage(to, message);
    console.log(req.body);
    res.send("OK");
});

async function main() {
    let argv = process.argv;
    let message;
    let port;

    for (let i = 0; i < argv.length; i++) {
        if (argv[i] === "-to") {
            to = argv[i + 1];
        }
        if (argv[i] === "-message") {
            message = argv[i + 1];
        }
        if (argv[i] === "-port") { // ポート番号を指定すると、webhookサーバーを起動する。
            port = argv[i + 1];
        }
    }

    // パラメータをチェックして、問題が無ければメッセージを送信する。
    if (port !== undefined && to !== undefined) {
        // Start the webhook server
        app.listen(port, () => {
            console.log(`Example app listening at ${process.env.WEBHOOK_URL}:${port}`);
        });
    } else if (to !== undefined && message !== undefined) {
        await sendMessage(to, message);
    } else {
        console.log("Invalid parameters.");
        console.log("Usage1: direct message");
        console.log("    node index.js -to [to] -message [message]");
        console.log("Usage2: start webhook server");
        console.log("    node index.js -port [port] -to [to]");
    }
}

main();