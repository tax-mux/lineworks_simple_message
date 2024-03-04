# LINEWORKS Simple Message Sender

To send a message to a LINEWORKS user via bot, you can use the following script:

## Installation

Expand the script to any folder in an environment where Node.js operates.
After expanding, execute the following command from the console.

npm init

## Usage

call index.js in command line as belows.

node index -to [recipient_user_id] -message [message]

* recipient_user_id: lineworks user. (user@company-domain)
* message: text message. if you need line break in message, use escape sequence \\n.
