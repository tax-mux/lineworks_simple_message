// Import the lineworks_simple_message module
const { getAccessToken, sendMessage } = require("./lineworks_simple_message");


async function main() {
    let argv = process.argv;
    let to;
    let message;

    for (let i = 0; i < argv.length; i++) {
        if (argv[i] === "-to") {
            to = argv[i + 1];
        }
        if (argv[i] === "-message") {
            message = argv[i + 1];
        }
    }
    // Send a message
    await sendMessage(to, message);
}

main();