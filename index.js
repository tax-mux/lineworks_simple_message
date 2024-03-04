// Import the lineworks_simple_message module
const { getAccessToken, sendMessage } = require("./lineworks_simple_message");


async function main() {
    // Send a message
    await sendMessage(
        "murakami@date-yakkyoku",
        "Hello, World!"
    );
}

main();