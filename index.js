const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { isValidDateFormat } = require('./utils')
const { addScheduleEntry, getContentByDate, scrapeDataAll, deleteContentByDateAndAuthor} = require('./scheduler')

const client = new Client({
  intents: [
    GatewayIntentBits.DirectMessages,
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.MessageContent,
  ],
  partials: [Partials.Channel],
});

client.commands = new Collection();

client.on('ready', () => console.log(`${client.user.tag} 에 로그인됨`));

client.login(process.env.TOKEN);

// 메세지 
client.on('messageCreate', msg => {
	console.log(msg.content)
  const command = msg.content.split(" ");
  if (command[0] == "!일정추가") {
    if (command.length >= 3 && isValidDateFormat(command[1])) {
      const content = command.slice(2).join(' ');
      const recive = addScheduleEntry(command[1], content, msg.author.username);
      msg.reply(recive);
    }
    else {
      msg.reply("argument error\n");
    }
  }
  else if (command[0] == "!일정") {
    if (command.length > 1) {
      const content = getContentByDate(command[1]);
      if (content) {
        console.log(`Content for date ${command[1]}:`);
        console.log(content);
        msg.reply(content);
      } else {
        console.log(`No content found for date ${command[1]}.`);
      }
    }
    else {
      const content = scrapeDataAll();
      if (content) {
        console.log(`Content for date ${command[1]}:`);
        console.log(content);
        msg.reply(content);
      } else {
        console.log(`No content found for date ${command[1]}.`);
      }
    }
  }
  else if (command[0] == "!일정삭제") {
    if (command.length >= 2 && isValidDateFormat(command[1])) {
        deleteContentByDateAndAuthor(command[1], msg.author.username);
    }
  }
})