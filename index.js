const Discord = require("discord.js");
const bot = new Discord.Client();

const token = "";

const PREFIX = "~";

const website = "website.com"

const ytdl = require("ytdl-core");

var version = "1.2.4";

let joinedChannel = null;

let queue = [];
let isPlaying = false;

bot.on("ready", () => {
  console.log("This bot is online!");

  bot.user.setActivity(statuses[0]);
});

bot.on("message", (msg) => {
  if (msg.content.charAt(0) != PREFIX) {
    //Checks if the prefix is ~
    return;
  }
  let args = msg.content.substring(PREFIX.length).split(" ");

  switch (args[0]) {
    case "help":
      const helpEmbed = new Discord.MessageEmbed() //Displays an embed when someones does the command ~help
        .setTitle("Help")
        .addField("Server", msg.guild.name, true)
        .addField("Username", msg.author.username, true)
        .setThumbnail(msg.author.displayAvatarURL())
        .setColor("0xffff00")
        .addField(
          "Commands",
          "`info`, `version info`, `webstore`, `website`, `store`, `ip`, `server`, `clear`, `status`, `play`, `p`, `stop`, `summon`"
        )
        .addField("Version", version);
      msg.channel.send(helpEmbed);

      break;

    case "info": //Tells the info of the bot
      msg.channel.send(
        "This bot was made on 5/26/2020 on a Tuesday afternoon."
      );
      break;
    case "version": //Tells the version of the bot
      if (args[1] == "info") {
        return msg.channel.send(
          "Rapid Version: " + version + "\nUpdated at 1:26 AM, 5/27/2020"
        );
      } else if (args[1] != "info") {
        return msg.channel.send("Invalid command! Try ~version info");
      }
      break;
    case "webstore": //If you have a website you want to advertise.
      msg.reply(website);
      break;

    case "stop": //Stops the bot and makes it leave the voice channel
      if (!msg.member.voice.channel) {
        return msg.channel.send("You must be in a channel to stop the bot");
      } else {
        const vc = msg.member.voice.channel;
        msg.react("🛑");
        vc.leave();
      }

      break;

    case "summon": //summons the bot to join the channel
      if (!msg.member.voice.channel) {
        return msg.channel.send("You need to be in a channel");
      } else {
        msg.member.voice.channel.join().then((connection) => {});
      }
      break;

    case "play": // plays music
      if (!msg.member.voice.channel) {
        return msg.channel.send("You must be in a channel to play music");

      } else {
        if (!args[1]) {
          return msg.channel.send("You need to put a link!");
        } else {
          let allChannels = msg.channel.name;
          let rapidChannel = bot.channels.cache.find(
            (channel) => channel.name.toLowerCase() === "rapidlogs"
          );
          msg.member.voice.channel.join().then((connection) => {
            msg.channel;
            let dispatcher = connection.play(
              ytdl(args[1], { filter: "audioonly" })
            );

            isPlaying = true;
            let player = msg.member.user.tag;
            const Embed = new Discord.MessageEmbed()
              .setTitle("Song Request")
              .setURL(args[1])
              .addField("Username", msg.author.username)
              .setThumbnail(msg.author.displayAvatarURL())
              .setColor("0xffff00");
            return rapidChannel.send(Embed);
          });
        }
      }
      break;

    case "store": //Same as website
      msg.reply(website);
      break;

    case "clear": //Clears messages in the disord channel only if the person has the role to do so
      if (!msg.member.roles.cache.find((r) => r.name === "rapidholder")) {
        return msg.channel.send("You do not have permission!");
      } else if (!args[1]) {
        return msg.channel.send("Error: please give a number 1-10");
      } else if (args[1] <= 10) { //change the amount of messages you want to clear
        msg.channel.bulkDelete(args[1]);
        let allChannels = msg.channel.name;
        let rapidChannel = bot.channels.cache.find(
          (channel) => channel.name.toLowerCase() === "rapidlogs" //Finds channel to display logs into *this will not work on your server*
        );
        let player = msg.member.user.tag;
        const Embed = new Discord.MessageEmbed()
          .setTitle("Messages Deleted")
          .addField("Server", msg.guild.name)
          .addField("Channel", allChannels)
          .addField("Username", msg.author.username)
          .addField("Messages Deleted", args[1])
          .setThumbnail(msg.author.displayAvatarURL())
          .setColor("0x80000");
        rapidChannel.send(Embed);
      } else {
        msg.channel.send("Error: please give a number 1-10");
      }
      break;

    case "embed":
      const Embed = new Discord.MessageEmbed()
        .addField("Username", msg.author.username)
        .addField("N", msg.author.displayAvatarURL())
        .addField("Yo Mama Gay");
      return msg.channel.send(Embed);

    case "status": //change what the bot is playing
      if (!args[1]) {
        return msg.channel.send("Error: please give a status");
      } else if (args[1]) {
        let rapidChannel = bot.channels.cache.find(
          (channel) => channel.name.toLowerCase() === "rapidlogs"
        );
        let player = msg.member.user.tag;
        var newStatus = "";
        for (let i = 1; i < args.length; i++) {
          newStatus += args[i] + " ";
        }
        bot.user.setActivity(newStatus);
        const Embed = new Discord.MessageEmbed()
          .setTitle("Status Set")
          .addField("Server", msg.guild.name)
          .addField("Username", msg.author.username)
          .addField("New Status", "Set to " + newStatus)
          .setThumbnail(msg.author.displayAvatarURL())
          .setColor("0xffff00");
        return rapidChannel.send(Embed);
      }
      break;

    case "roll": //roll a dice
      let value = args[1];
      if (!args[1]) {
        msg.channel.send("You need to put an input.");
      }
      if (isNaN(args[1])) {
        return msg.channel.send("Your input must be a number");
      } else {
        if (args[2]) {
          msg.channel.send("Your input needs to be one value");
        } else {
          let numberValue = Math.floor(Math.random() * value) + 1;
          msg.channel.send(numberValue);
        }
      }
      break;

    case "coinflip": //flip a coin
      let numberValue = Math.floor(Math.random() * 2) + 1;
      if (numberValue === 1) {
        msg.channel.send("Heads");
      } else {
        msg.channel.send("Tails");
      }
      break;
  }
});



bot.login(token);
