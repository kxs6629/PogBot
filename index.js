// Imports
const Discord = require("discord.js");
const config = require("./config.json");

// Instantiate Discord Client and Guild
const client = new Discord.Client();
const curServer = new Discord.Guild();

// Set the prefix that the bot will respond to
const prefix = "!";

//!help is called iterate through this and display the commands to user
const commandList = ["pog","help","peter"];

// Custom Emojis to keep track of
// let pogChamp = curServer.emojis.cache.find( emoji => emoji.name == "pogChamp");

// Variables to keep track of various pogChamps
let champ = 0;
let weird = 0;
let lastChamp;

// Dictionary that holds the various pogChamps
let pogType = {};
pogType['pogChamp'] = champ;
pogType['weirdChamp'] = weird;

client.on("ready",() => {
	console.log("Ready!");
	const channel = client.channels.cache.get('762848205054148619');
	channel.send('Gamer time :sunglasses: \nUse !help for a list of commands');
	client.user.setStatus("Being gamer");
})

//Listener for discord messages
client.on("message", function(message){
	if(message.author.bot) return;
	
	else if(message.content.startsWith(prefix)){
		const commandBody = message.content.slice(prefix.length);
		const args = commandBody.split(' ');
		const command = args.shift().toLowerCase();

		if(command === "help"){
			let help= "These are the following commands: \n";
			commandList.forEach(element =>
				help += "!"+element+"\n"
			);
			message.reply(help);
		}

		else if(command === "pog"){
			if(champ == 0){
				message.reply("not yet buddy");
			}
			else{
				message.reply("\n<:pogChamp:762885350548045875> has been sent "+champ+" times. Last sent by: "+"<@"+lastChamp+">");
			}
		}

		else if(command === "peter"){
			message.reply("Hey peter");
		}
	}
	if(!message.content.startsWith(prefix)){
		if(
			message.content.includes("<:pogChamp:762885350548045875>") ||
			message.content.includes("<:1635_WeirdChamp:717936774315376772>") ||
			message.content.includes("<:poggers:759138511982559283>") ||
			message.content.includes("<:576614562598748213:759138845610213376>")
		){
			champ++;
			lastChamp = message.author.id;
			console.log(lastChamp+" said the funny word");
		}
	}
});

client.login(config.BOT_TOKEN);