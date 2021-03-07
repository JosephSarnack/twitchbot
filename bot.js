const { ApiClient } = require('twitch');
const fs = require('fs-extra');
const fs2 = require('fs').promises
const { ChatClient } = require('twitch-chat-client')
const { RefreshableAuthProvider, StaticAuthProvider } = require('twitch-auth')
const { PubSubClient } = require('twitch-pubsub-client');
const { PubSubRedemptionMessage } = require('twitch-pubsub-client');


var XMLHttpRequest = require("xmlhttprequest").XMLHttpRequest;
var xhr = new XMLHttpRequest();



const { DOToken, StripName } = require("./tokens/davidtokens.json");
const { COToken, lightright, lightleft } = require("./tokens/cmortokens.json");
const { clientId, clientSecret } = require("./tokens/TwitchToken.json")
const { accessToken, refreshToken, expiryTimestamp } = require('./tokens.json')

var d = new Date();
var weekday = new Array(7);
weekday[0] = "Sunday";
weekday[1] = "Monday";
weekday[2] = "Tuesday";
weekday[3] = "Wednesday";
weekday[4] = "Thursday";
weekday[5] = "Friday";
weekday[6] = "Saturday";

//#region  variables 
var day = weekday[d.getDay()];
var currentday
var streamer
var streamertoday = 'cmor'
var thisday = d.getDay()
var nextday = d.getDay() + 1

var copscountdown = 0;
var partytimecountdown = 0;
var ELMO_COUNTDOWN = 0;
var NO_COUNTDOWN = 0;
var PROBLLEMS_COUNTDOWN = 0
var FESTIVUS_COUNTDOWN = 0
var HEY_LISTEN_COUNTDOWN = 0

var bigsisgreeting = false;
var slayergreeting = false;
var slayerfirstbit = false;
var xxenderpheonixxgreeting = false;
var cheesycaninegreeting = false;
var adacaiagreeting = false;
var scarheadx2greeting = false;
var tumblegreeting = false

const myregexp = /^#[0-9A-F]{6}$/i
const myregexpnopound = /^[0-9A-F]{6}$/i

var redhex, bluehex, greenhex
var prefix = '!'
var hexcode

//#endregion

let hourcheck = setInterval(() => {
  day = weekday[d.getDay()];
  currentday = d.getDay();
  var currenthour = d.getHours();
  if ((currentday == 0 && currenthour >= 4) || (currentday == 1 && currentday >= 4)
    || (currentday == 3 && currenthour >= 4) || (currentday == 5 && currenthour >= 4)) {
    streamertoday = 'cmor'
  }
  else if ((currentday == 2 && currenthour >= 4) || (currentday == 4 && currenthour >= 4)
    || (currentday == 6 && currenthour >= 4)) {
    streamertoday = 'david'
  }

  if (thisday == 6 || nextday == 7) {
    thisday = 0
    nextday = 1
  }
  else if (thisday < nextday) {
    thisday = nextday
    nextday = thisday + 1
  }

}, 3600000);

let timercountdown = setInterval(() => {
  if (copscountdown >= 0) {
    copscountdown--
  }
  else if (copscountdown <= 0) { }

  if (partytimecountdown > 0) {
    partytimecountdown--
  }
  else if (partytimecountdown <= 0) { }

  if (ELMO_COUNTDOWN >= 0) {
    ELMO_COUNTDOWN--
  }

  if (NO_COUNTDOWN >= 0) {
    NO_COUNTDOWN--
  }

  if (PROBLLEMS_COUNTDOWN >= 0) {
    PROBLLEMS_COUNTDOWN--
  }

  if (FESTIVUS_COUNTDOWN >= 0) {
    FESTIVUS_COUNTDOWN--
  }

  if (HEY_LISTEN_COUNTDOWN >= 0) {
    HEY_LISTEN_COUNTDOWN--
  }

}, 1000);

console.log(streamertoday)


async function main() {
  //#region token

  const tokenData = JSON.parse(await fs.readFile('./tokens.json'));
  const auth = new RefreshableAuthProvider(
    new StaticAuthProvider(clientId, tokenData.accessToken),
    {
      clientSecret,
      refreshToken: tokenData.refreshToken,
      expiry: tokenData.expiryTimestamp === null ? null : new Date(tokenData.expiryTimestamp),
      onRefresh: async ({ accessToken, refreshToken, expiryDate }) => {
        const newTokenData = {
          accessToken,
          refreshToken,
          expiryTimestamp: expiryDate === null ? null : expiryDate.getTime()
        };
        await fs.writeFile('./tokens.json', JSON.stringify(newTokenData, null, 4), 'UTF-8')
      }
    }
  );
  const apiClient = new ApiClient({ authProvider: auth });

  //#endregion token

  var PSC = new PubSubClient()
  const userId = await PSC.registerUserListener(apiClient)
  var PSR = new PubSubRedemptionMessage()
  PSC.onRedemption(userId, (message) => {
    console.log(message.rewardName + "   ")
  })

  // var testlivestream = await isStreamLive('thewisemeh')
  // console.log(testlivestream)




  const chatClient = new ChatClient(auth, { channels: ['thewisemeh'] });
  await chatClient.connect(
    console.log('I have connected')
  );




  chatClient.onMessage((channel, user, message, msg) => {

    console.log(user + " said >>> " + message)
    const args = message.slice(prefix.length).trim().split(/ +/);
    var RL = msg._raw;

    var lightselect = 'N/A'
    var davidslights = false
    var cmorslights = false
    var cmorlightLR = 'N/A'
    var lighteffect = 'N/A'
    var randomcolor = false
    var fullyrandom = false
    var red, green, blue = ""
    var selector = ""


    //#region greetings
    if (user == 'sezenwow' && bigsisgreeting == false) {
      bigsisgreeting = true;
      let timercountdown = setTimeout(() => { chatClient.say(channel, "Hey Bigsis!") }, 10000);
    }
    if (user == 'slayer6409' && slayergreeting == false) {
      slayergreeting = true;
      let timercountdown = setTimeout(() => { chatClient.say(channel, "Hey Slayer, Thanks for the test help.") }, 10000);
    }
    else if (user == 'cheesycanine' && cheesycaninegreeting == false) {
      let timercountdown = setTimeout(() => { chatClient.say(channel, "Everyone watch out, Cheesycanine is gonna BAP you!") }, 10000);
      cheesycaninegreeting = true;
    }
    else if (user == 'adacaia' && adacaiagreeting == false) {
      let timercountdown = setTimeout(() => { chatClient.say(channel, "Noodle off Noodle") }, 10000);
      adacaiagreeting = true;
    }
    else if (user == 'xxenderpheonixx' && xxenderpheonixxgreeting == false) {
      let timercountdown = setTimeout(() => { chatClient.say(channel, "Ender since you're here we require a joke from you thewis9CmorHeadbanger ") }, 10000);
      xxenderpheonixxgreeting = true;
    }
    else if (user === 'scarheadx2' && scarheadx2greeting == false) {
      let timercountdown = setTimeout(() => { chatClient.say(channel, "scarheadx2, this man is a potato, in all his starchy goodness") }, 10000);
      scarheadx2greeting = true;
    }

    else if (user === 'tumbleweed82') {
      let timercountdown = setTimeout(() => { chatClient.say(channel, "Kreygasm Kreygasm TUMBLE!! Kreygasm Kreygasm") }, 2000);
      tumblegreeting = true;
    }
    //#endregion greetings



    //console.log(RL)
    // fully random  50105636-b4ac-4490-bd18-d96ef6584404
    // random Front or back selected f56bf3da-58c3-4176-831b-af7d52f7b8a5
    // 
    //#region  Light redemption area
    //check for david's lights
    if (RL.includes("23cdddc3-7648-4842-9878-916057137c97")) {
      davidslights = true;
    }
    // check for cmor's light
    if (RL.includes("724d50a0-203a-4c12-b7b2-1eb56cc7a180") || RL.includes("022664d1-e9e8-4cbf-a29d-40d4515112db")
      || RL.includes("e9856b4d-92c4-4c32-825b-4453b75178a4") || RL.includes("dec0faf3-b3d7-4536-9a2a-631b47a5601a")
      || RL.includes("f56bf3da-58c3-4176-831b-af7d52f7b8a5") || RL.includes("50105636-b4ac-4490-bd18-d96ef6584404")) {
      cmorslights = true
    }
    //check for flash or set
    if (RL.includes("724d50a0-203a-4c12-b7b2-1eb56cc7a180") || RL.includes("022664d1-e9e8-4cbf-a29d-40d4515112db")) {
      lighteffect = 'flash';
    }
    //set
    else if (RL.includes("e9856b4d-92c4-4c32-825b-4453b75178a4") || RL.includes("dec0faf3-b3d7-4536-9a2a-631b47a5601a")
      || RL.includes("f56bf3da-58c3-4176-831b-af7d52f7b8a5") || RL.includes("50105636-b4ac-4490-bd18-d96ef6584404")
      || RL.includes("23cdddc3-7648-4842-9878-916057137c97")) {
      lighteffect = 'set';
    }
    //back
    if (RL.includes("724d50a0-203a-4c12-b7b2-1eb56cc7a180") || RL.includes("dec0faf3-b3d7-4536-9a2a-631b47a5601a")) {
      cmorlightLR = 'left'
    }
    //front
    else if (RL.includes("022664d1-e9e8-4cbf-a29d-40d4515112db") || RL.includes("e9856b4d-92c4-4c32-825b-4453b75178a4")) {
      cmorlightLR = 'right'
    }
    //random color
    if (RL.includes("f56bf3da-58c3-4176-831b-af7d52f7b8a5") || RL.includes("50105636-b4ac-4490-bd18-d96ef6584404")) {
      randomcolor = true
    }
    //#endregion Light redemption area

    //masterlightcontrol(args, cmorslights, davidslights, lighteffect, cmorlightLR, randomcolor, fullyrandom)

    if (message === '!ping') {
      chatClient.say(channel, 'Pong!');
    } else if (message === '!d20') {
      const diceRoll = Math.floor(Math.random() * 20) + 1;
      chatClient.say(channel, `@${user} rolled a ${diceRoll}`)
    }
    else if (message === '!followage') {
      const followAgeListener = chatClient.onMessage(async (channel, user, message, msg) => {
        if (message === '!followage') {
          const follow = await apiClient.kraken.users.getFollowedChannel(msg.userInfo.userId, msg.channelId);
          if (follow) {
            const currentTimestamp = Date.now();
            const followStartTimestamp = follow.followDate.getTime();
            chatClient.say(channel, `@${user} You have been following for ${past2present((currentTimestamp - followStartTimestamp))}!`);
          } else {
            chatClient.say(channel, `@${user} You are not following!`);
          }
        }
      });
    }
    else if (message === "!lurk") {
      chatClient.say(channel, '"thank you" ' + user + ' "for stopping by and lurking. Or some shit" -David')
    }
    else if (message === "!party" && (user == 'slayer6409' || user == 'sezenwow')) {
      if (partytimecountdown <= 0) {
        chatClient.say(channel, "INCOOOOOOOOOOOOOMING!!!! " + user + " Is trying to throw a party!")
        var partytimetimer = setInterval(() => {
          if (streamertoday == 'cmor') {
            hexcode = masterlightcontrol(args, true, false, set, 'random', true)
          }
          else if (streamertoday == 'david') {
            hexcode = masterlightcontrol(args, false, true, set, false, true)
          }
          var partytimergb = randomnumberfunction();

          var xhr = new XMLHttpRequest();
          xhr.withCredentials = true;
          xhr.addEventListener("readystatechange", function () {
            if (this.readyState === 4) {
              //console.log(this.responseText);
              var myObj = JSON.parse(this.responseText)
              console.log(myObj.name.value)
              //chatClient.say(channel, "The nearest named color for the one you slected is  " + myObj.name.value)
            }
          });
          xhr.open("GET", "https://www.thecolorapi.com/id?hex=" + hexcode);
          xhr.send();

        }, 2000);

        setTimeout(() => {
          clearInterval(partytimetimer)
        }, 60000);

      }
      else {
        chatClient.say(channel, "INCOOOOOOOOOOOOOMING!!!! But the lights are on the fritz so nolight show.")
      }
      partytimecountdown = 60
    }
    else if (message === "!gfdi") {
      console.log(ELMO_COUNTDOWN)
      if (ELMO_COUNTDOWN > 0) {
        chatClient.say(channel, "Elmo needs a lozenge")
      }
      else if (ELMO_COUNTDOWN <= 0) {
        ELMO_COUNTDOWN = 120
      }

    }
    else if (message === "no") {
      if (NO_COUNTDOWN > 0) {
        chatClient.say(channel, 'I knew exactly what to do. But in a much more real sense, I had no idea what to do."')
      }
      else if (NO_COUNTDOWN <= 0) {
        NO_COUNTDOWN = 300
      }
    }
    else if (message === "problems") {
      if (PROBLLEMS_COUNTDOWN > 0) {
        chatClient.say(channel, "I guess I dont have as many problems as before")
      }
      else if (PROBLLEMS_COUNTDOWN <= 0) {
        PROBLLEMS_COUNTDOWN = 300
      }
    }
    else if (message === "festivus") {
      if (FESTIVUS_COUNTDOWN > 0) {
        chatClient.say(channel, "Festivus is over")
      }
      else if (FESTIVUS_COUNTDOWN <= 0) {
        FESTIVUS_COUNTDOWN = 300
      }
    }
    else if (message === '!slap') {
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      var randomuser
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          randomuser = this.responseText;
          chatClient.say(channel, user + ' has just slapped ' + randomuser)
        }
      });
      xhr.open("GET", "https://2g.be/twitch/randomviewer.php?channel=thewisemeh");
      xhr.setRequestHeader("Cookie", "__cfduid=ddad4023a548a1eb09d507f8622e4b3371593118251");
      xhr.send();
    }
    else if (message === '!hug') {

      var randomnumber = randomnumberfunction()

      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      var randomuser
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          randomuser = this.responseText;
          chatClient.say(channel, user + ' has just hugged ' + randomuser)
          var randomnumber = randomnumberfunction()
          if (randomnumber === 5) {
            chatClient.say(channel, user + " just hugged " + randomuser + ' they might have needed it.')
          }
          else if (randomnumber === 1) {
            chatClient.say(channel, 'Hugging during the virus? Gonna call the cops on you...')
          }
          else {
            chatClient.say(channel, user + " just hugged " + randomuser)
          }
        }
      });
      xhr.open("GET", "https://2g.be/twitch/randomviewer.php?channel=thewisemeh");
      xhr.setRequestHeader("Cookie", "__cfduid=ddad4023a548a1eb09d507f8622e4b3371593118251");
      xhr.send();
    }
    else if (message === '!newt') {
      var xhr = new XMLHttpRequest();
      xhr.withCredentials = true;
      var randomuser
      xhr.addEventListener("readystatechange", function () {
        if (this.readyState === 4) {
          randomuser = this.responseText;
          chatClient.say(channel, user + ' has just turned ' + randomuser + ' into a newt!');
          var randomnumber = randomnumberfunction()
          if (randomnumber === 5) {
            chatClient.say(channel, "Maybe they'll get better");
          }
          else if ((randomnumber === 5 || randomnumber === 8) && user === 'itz_nastyyy') {
            chatClient.say(channel, 'I see you nastyyy.')

          }
        }
      });
      xhr.open("GET", "https://2g.be/twitch/randomviewer.php?channel=thewisemeh");
      xhr.send();
    }
    else if (message === '!resetlights' || message === '!lightsreset') {
      cmorslights = true
      lighteffect = 'set'
      cmorlightLR = 'both'
      color = 'white'
      masterlightcontrol(args, cmorslights, davidslights, lighteffect, cmorlightLR, randomcolor, color)
    }




  });


  chatClient.onJoin((channel, user) => {
    console.log(user + " has joined " + channel)
  })



  async function isStreamLive(userName) {
    const user = await apiClient.helix.users.getUserByName(userName);
    // const channelID = await apiClient.helix.users.getUserByName(userName)
    // console.log(channelID)
    if (!user) {
      return false;
    }
    return await apiClient.helix.streams.getStreamByUserId(user.id) !== null;
  }
}

main();

function randomrgbvalue() {
  var randomnum = Math.floor(Math.random() * 256)
  return randomnum
}

function randomnumberfunction(top) {
  var randomnum = Math.floor(Math.random() * top || 10) + 1
  return randomnum
}


function past2present(t) {
  var time = t / 1000
  var seconds = parseInt(time, 10);

  var days = Math.floor(seconds / (3600 * 24));
  seconds -= days * 3600 * 24;
  var hrs = Math.floor(seconds / 3600);
  seconds -= hrs * 3600;
  var mnts = Math.floor(seconds / 60);
  seconds -= mnts * 60;
  return (days + " days, " + hrs + " Hrs, " + mnts + " Minutes, ");
}

function masterlightcontrol(args, cmorslights, davidslights, lighteffect, cmorlightLR, randomcolor, colors) {

  console.log(args + "    " + cmorslights + "    " + davidslights + "    " + lighteffect + "    " + cmorlightLR + "    " + randomcolor)
  if (args[0] === 'rgb') {
    var red, green, blue, color;
    console.log("This used the RGB side of lights")
    if (isNaN(args[1]) == false && isNaN(args[2]) == false && isNaN(args[3]) == false) {
      if (args[1] > 255 || args[2] > 255 || args[3] > 255) {
        console.log(`One or more of those numbers are too high try again, or not I'm a bot what do I care.`)
      }
      else if (args[1] < 0 || args[2] < 0 || args[3] < 0) {
        console.log(`One or more of those numbers are too low try again`)
      }
      else {
        red = args[1]
        green = args[2]
        blue = args[3]
        console.log("RGB: " + red + green + blue)
        color = 'rgb:' + red + ',' + green + ',' + blue //color
        redhex = red.toString(16)
        if (redhex.toString().length < 2) {
          redhex = ('0' + red.toString(16).slice(-2))
        }
        greenhex = green.toString(16)
        if (greenhex.toString().length < 2) {
          greenhex = ('0' + green.toString(16).slice(-2))
        }
        bluehex = blue.toString(16)
        if (bluehex.toString().length < 2) {
          bluehex = ('0' + blue.toString(16).slice(-2))
        }
        console.log(redhex + "   " + greenhex + "    " + bluehex)
        mastercontrolhexcode = redhex + greenhex + bluehex
      }
    }
  }
  else if (isNaN(args[0]) == false && isNaN(args[1]) == false && isNaN(args[2]) == false) {
    if (args[0] > 255 || args[1] > 255 || args[2] > 255) {
      console.log(`One or more of those numbers are too high try again, or not I'm a bot what do I care.`)
    }
    else if (args[0] < 0 || args[1] < 0 || args[2] < 0) {
      console.log(`One or more of those numbers are too low try again`)
    }
    else {
      red = args[0]
      green = args[1]
      blue = args[2]
      console.log("RGB: " + red + green + blue)
      color = 'rgb:' + red + ',' + green + ',' + blue //color
      redhex = red.toString(16)
      if (redhex.toString().length < 2) {
        redhex = ('0' + red.toString(16).slice(-2))
      }
      greenhex = green.toString(16)
      if (greenhex.toString().length < 2) {
        greenhex = ('0' + green.toString(16).slice(-2))
      }
      bluehex = blue.toString(16)
      if (bluehex.toString().length < 2) {
        bluehex = ('0' + blue.toString(16).slice(-2))
      }
      console.log(redhex + "   " + greenhex + "    " + bluehex)
      mastercontrolhexcode = redhex + greenhex + bluehex
    }

  }
  else if ((args[0] == "red" || args[0] == "r") && (args[2] == "green" || args[2] == 'g') && (args[4] == "blue" || args[4] == 'b')) {
    //console.log( args[1]+ "   "+ args[3])
    if (args[1] > 255 || args[3] > 255 || args[5] > 255) {
      console.log(`One or more of those numbers are too high try again, or not I'm a bot what do I care.`)
    }
    else if (args[1] < 0 || args[3] < 0 || args[5] < 0) {
      console.log(`One or more of those numbers are too low try again`)
    }
    else {
      red = args[1]
      green = args[3]
      blue = args[5]
      console.log("RGB: " + red + green + blue)
      color = 'rgb:' + red + ',' + green + ',' + blue //color
      redhex = red.toString(16)
      if (redhex.toString().length < 2) {
        redhex = ('0' + red.toString(16).slice(-2))
      }
      greenhex = green.toString(16)
      if (greenhex.toString().length < 2) {
        greenhex = ('0' + green.toString(16).slice(-2))
      }
      bluehex = blue.toString(16)
      if (bluehex.toString().length < 2) {
        bluehex = ('0' + blue.toString(16).slice(-2))
      }
      console.log(redhex + "   " + greenhex + "    " + bluehex)

      mastercontrolhexcode = redhex + greenhex + bluehex

    }
  }
  else if (args[0] === 'hex') {
    console.log("This tried to use the Hex side of lights")
    if (myregexp.test(args[1]) || myregexpnopound.test(args[1])) {
      console.log('this worked')
      firstarg = args[1]
      if (firstarg.charAt(0) == "#") {
        hexcode = args[1].slice(1)
        color = hexcode
        mastercontrolhexcode = hexcode
      }
      else {
        color = args[1]
        mastercontrolhexcode = color

      }
    }
    else {
      console.log('this didnt')
    }
  }
  else {
    console.log(`Look, one of us fucked up. \n Try again, or contact Cmor`)
  }

  // mastercontrolhexcode



  // var hex = (redhex + greenhex + bluehex) || color
  // args for light color or zone (maybe)
  // cmorlights t/f done 
  // davids lights t/f done 
  // lighteffect set or flash
  // cmorlr left or right
  // randomcolor t/f
  // const { DOToken, StripName } = require("./tokens/davidtokens.json");
  // const { COToken, lightright, lightleft } = require("./tokens/cmortokens.json");
  if (cmorslights == true) {
    token = COToken
  }
  else if (davidslights == true) {
    token = DOToken
    selector = StripName
  }
  else {
    console.log("No lights were selected?")
  }



  if (cmorlightLR == "left") {
    selector = lightleft
  }
  else if (cmorlightLR == "right") {
    selector = lightright
  }
  else if (cmorlightLR == 'both' || 'all') {
    selector = 'all'
    var xhr = new XMLHttpRequest();
    var URL = "https://api.lifx.com/v1/lights/" + selector + "/state?color=" + colors
    console.log('Inside set color request')
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    xhr.open("PUT", URL);
    xhr.setRequestHeader("Authorization", token);

    xhr.send();
    return
  }
  else if (cmorlightLR == 'random' || cmorlightLR == 'rand') {
    var leftorright = randomnumberfunction(2)
    if (leftorright == 1) {
      selector = lightleft
    }
    else if (leftorright == 2) {
      selector = lightright
    }
  }
  else {
    console.log("Wasn't for Cmor")
  }

  if (randomcolor == true) {
    red = randomrgbvalue()
    green = randomrgbvalue()
    blue = randomrgbvalue()
    color = 'rgb:' + red + ',' + green + ',' + blue //color
    if (day == 'Sunday' || 'Monday' || 'Wednesday' || 'Friday') {
      token = COToken
      var leftorright = randomnumberfunction(3)
      if (leftorright == 1) {
        selector = lightright
      }
      else if (leftorright == 2) {
        selector = lightleft
      }
      else {
        console.log("Fix the top number or the function")
      }
    }
    else if (day == 'Tuesday' || day == 'Thrsday' || day == 'Saturday') {
      token = DOToken
      selector = StripName
    }
  }

  if (lighteffect == 'flash') {
    // POST https://api.lifx.com/v1/lights/:selector/effects/pulse
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;

    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });

    xhr.open("POST", "https://api.lifx.com/v1/lights/" + selector + "/effects/pulse?" + color + "&period=1&cycles=5");
    xhr.setRequestHeader("Authorization", token);

    xhr.send();
  }
  else if (lighteffect == 'set') {
    var xhr = new XMLHttpRequest();
    var URL = "https://api.lifx.com/v1/lights/" + selector + "/state?color=" + color
    console.log('Inside set color request')
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        console.log(this.responseText);
      }
    });
    xhr.open("PUT", URL);
    xhr.setRequestHeader("Authorization", token);
    xhr.send();
  }

  return mastercontrolhexcode
}

