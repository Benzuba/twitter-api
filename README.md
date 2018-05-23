twitter_interface
The Twitter interface will show

5 recent tweets 5 recent friends DM conversation for the last 30 days



How to use
Create a Twitter App, with 'Read, Write and Access direct messages' permissions, then generate your keys and tokens in Keys and Access Tokens.

Create a config.js file in the root directory with your Twitter keys/tokens like this:

```javascript
const config = {
  consumer_key: "YOUR-CONSUMER-KEY",
  consumer_secret: "YOUR-CONSUMER-SECRET",
  access_token_key: "YOUR-ACCESS-TOKEN",
  access_token_secret: "YOUR-ACCESS-TOKEN-SECRET"
};

module.exports = config;
```

run - npm install

run - npm start

http://localhost:3000/
