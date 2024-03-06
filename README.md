# LINEWORKS Simple Message Sender

This is script To send a message to a LINEWORKS user via bot.

this script has functions are:

1. sending message directly.
1. working as simple webhook server.

## Installation

Expand the script to any folder in an environment where Node.js operates.
After expanding, execute the following command from the console.

npm init

## Usage

call index.js in command line as belows.

### sending message directory:

```
node index -to [recipient_user_id] -message [message]
```

* recipient_user_id: lineworks user. (e.g., user@company-domain)
* message: text message. if you need line break in message, use escape sequence \\\\n.

### working as a webhook server:

```
node index -to [recipient_user_id] -port [portnumber]
```

* recipient_user_id: lineworks user. (e.g., user@company-domain)
* portnumber: webhook listen port. (e.g, 3000)