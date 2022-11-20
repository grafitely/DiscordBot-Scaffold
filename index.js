// Grafitely 2022, Use Freely :D
// Imports libraries, dotenv(https://www.npmjs.com/package/dotenv), discord.js(https://discord.js.org/#/)
const { Client, GatewayIntentBits, Events, REST, Routes, CommandInteraction, } = require("discord.js")
require("dotenv/config")

//initiates client with Intents(https://discordjs.guide/popular-topics/intents.html#privileged-intents)
const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
    ]
})

//communicates with discords api to help initialize slash commands (https://discordjs.guide/additional-info/rest-api.html#making-http-requests-with-node)
const rest = new REST({ version: '10' }).setToken(process.env.TOKEN);

//states the bot is initialized to the console
client.on("ready", () => {
    console.log("Bot initialised")  
})

//example event of the bot being annoying and reading out a deleted message
client.on(Events.MessageDelete, message => {
    const replymessage = "<@" + message.author + "> Just deleted a message!!! it was '" + message.content + "'";
    message.channel.send(replymessage);
})

//initializes slash commands 
async function main (){
    try{
        const commands = [
            {
              name: 'ping',
              description: 'Replies with Pong!',
            },
        ];

        await rest.put(Routes.applicationCommands(process.env.CLIENTID), {
            body: commands
        });
    }
    catch(e){   

    } 
}

//makes slash commands actually do something
client.on(Events.InteractionCreate, interaction => {
    if (!interaction.isChatInputCommand()){
        return;
    }

    if(interaction.commandName === "ping"){
        interaction.reply("pong");
    }
})

main();

//logs on the bot
client.login(process.env.TOKEN);
