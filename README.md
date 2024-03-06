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

copy .env.sample into .env and modify setting for your environmet.

copy privatekey.pem.sample into privatekey.pen and overwrite your privatekey. You can get this key from Lineworks Developers.

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

* recipient_user_id: lineworks user. (e.g., user@company-domain). If you include query parameter "to" in your webhook url, you can use this script without this parameter in command line.(e.q, http://yourwebhook.url:3000?to=user@companydomain)
* portnumber: webhook listen port. (e.g, 3000)