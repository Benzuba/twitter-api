const express = require('express');
const Twitter = require('twitter');
const config = require('./config.js');
const timeConverter = require ('./public/js/app.js')


const app = express();


app.use(express.static("public"));
app.set('view engine', 'pug');

const client = new Twitter(config);

let user = {};
let  tweets = [];
let  friends = [];
let  messages = [];

app.listen(3000, () =>{
  console.log("Serving is running on port 3000!");
});

//make a get request for users information
client.get('account/verify_credentials',{skip_status: true}, function(error, data, response){
  if(error) console.log(error);
  user.name = data.screen_name;
  user.image = data.profile_image_url;
  user.background_image = data.profile_background_image_url;
  user.friend_count = data.friends_count;
});




// make a get request for "5" recent tweets
client.get('statuses/user_timeline', {count: 5} , function(error, data, response) {
  if(error) console.log(error);
//use length of data response to avoid error if number of tweets is < 5
  for (let i = 0; i < data.length; i++){
    tweets[i] = {};
    tweets[i].text = data[i].text;
    tweets[i].retweets = data[i].retweet_count;
    tweets[i].likes = data[i].favorite_count;
    tweets[i].created = data[i].created_at;
  };
});

//make a get request for "5" recent friends
client.get('followers/list', {count: 5} , function(error, data, response) {
  if(error)  console.log(error);
  for (let i = 0; i < data.users.length; i++){
    friends[i] = {};
    friends[i].profile_image = data.users[i].profile_image_url;
    friends[i].real_name = data.users[i].name;
    friends[i].screen_name = data.users[i].screen_name;
  };
});

//make a get request for "5" recent direct messages
client.get('direct_messages/events/list',{count: 5}, function(error, data, response) {
  if(error) console.log(error);
  for (let i = 0; i < data.events.length; i ++){
    messages[i] = {};
    messages[i].text = data.events[i].message_create.message_data.text;
    messages[i].timestamp = timeConverter(parseInt(data.events[i].created_timestamp));
  };
});


    app.get('/', (req, res) => {
    const twitterData = {user, tweets, friends, messages}
    res.render('index', twitterData);
});
