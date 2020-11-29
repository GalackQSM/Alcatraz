//  ______   __                      __                                  
// /      \ |  \                    |  \                                 
//|  $$$$$$\| $$  _______  ______  _| $$_     ______   ______   ________ 
//| $$__| $$| $$ /       \|      \|   $$ \   /      \ |      \ |        \
//| $$    $$| $$|  $$$$$$$ \$$$$$$\\$$$$$$  |  $$$$$$\ \$$$$$$\ \$$$$$$$$
//| $$$$$$$$| $$| $$      /      $$ | $$ __ | $$   \$$/      $$  /    $$ 
//| $$  | $$| $$| $$_____|  $$$$$$$ | $$|  \| $$     |  $$$$$$$ /  $$$$_ 
//| $$  | $$| $$ \$$     \\$$    $$  \$$  $$| $$      \$$    $$|  $$    \
// \$$   \$$ \$$  \$$$$$$$ \$$$$$$$   \$$$$  \$$       \$$$$$$$ \$$$$$$$$
//=======================================================================                                                                      
//● Crée par GalackQSM#0895 le 09 novembre 2020
//● Serveur Discord: https://discord.gg/HPtTfqDdMr
//● Github: https://github.com/GalackQSM/Alcatraz                                                      
//=======================================================================                                                                      

const config = require('./config.json');
const Client = require('./src/Client.js');
const { Intents } = require('discord.js');
const Discord = require('discord.js')
const DBL = require("dblapi.js");
let fetch = require("node-fetch");
const snekfetch = require('snekfetch');

global.__basedir = __dirname;

const intents = new Intents();
intents.add(
  'GUILD_PRESENCES',
  'GUILD_MEMBERS',
  'GUILDS',
  'GUILD_VOICE_STATES',
  'GUILD_MESSAGES',
  'GUILD_MESSAGE_REACTIONS'
);
const client = new Client(config, { ws: { intents: intents } });

function init() {
  client.loadEvents('./src/events');
  client.loadCommands('./src/commands');
  client.login(client.token);
}

init();
    client.on("guildCreate", async guild => {
  
        let canal = client.channels.cache.get("775339804765454396")
        
             const embed = new Discord.MessageEmbed()
            .setThumbnail(guild.iconURL)
            .setTitle("`➕` "+config.NomBot+" a rejoint un serveur")
            .setDescription("Merci à **"+ guild.owner.user.tag +"** de m'avoir ajouté dans son serveur, je suis maintenant dans **"+ client.guilds.cache.size +" serveurs**.\n\n__Informations du serveur :__\n• :pencil: **Nom:** "+ guild.name +"\n• :earth_americas: **Region:** " +guild.region +"\n• :mortar_board: **Rôles:** "+guild.roles.cache.size+"\n• :man_detective: **Membres:** "+guild.memberCount+"\n• :id: **ID:** "+guild.id+"\n• :crown: **Propriétaire:** "+ guild.owner.user.tag +"")
            .setTimestamp()
            .setColor("1fd10f")
            .setFooter(config.footer)
        
            canal.send({ embed });
        });

    client.on('guildDelete', async guild => {

        let canal = client.channels.cache.get("775339804765454396")

        const embed = new Discord.MessageEmbed()
        .setThumbnail(guild.iconURL)
        .setTitle("`➖` "+config.NomBot+" a quitté un serveur")
        .setDescription("Dommage **"+ guild.owner.user.tag +"** viens de m'exclure de son serveur, je ne suis plus que dans **"+ client.guilds.cache.size +" serveurs**.\n\n__Informations du serveur :__\n• :pencil: **Nom:** "+ guild.name +"\n• :earth_americas: **Region:** " +guild.region +"\n• :mortar_board: **Rôles:** "+guild.roles.cache.size+"\n• :man_detective: **Membres:** "+guild.memberCount+"\n• :id: **ID:** "+guild.id+"\n• :crown: **Propriétaire:** "+ guild.owner.user.tag +"")
        .setTimestamp()
        .setColor("d90e0b")
        .setFooter(config.footer)
        
            canal.send({ embed });
        });

client.on('message', message => {
  if(config.ANTI_INSULTE.some(word => message.content.toLowerCase().includes(word))){

         const antiinsulte = new Discord.MessageEmbed()
        .setTitle(":no_entry: Filtre anti-insulte détecté")
        .setDescription("**"+message.author.username+"** merci de ne pas mettre d'insulte dans tes messages.")
        .setTimestamp()
        .setColor("#2f3136")
        .setFooter(config.footer)
        message.channel.send(antiinsulte).then(message => message.delete({ timeout: 5000 }));
        message.delete()

  }})

//Top.gg
const dbl = new DBL(config.Topgg, client);
dbl.on('posted', () => {
  console.log('Nombre de serveurs publié!');
})
dbl.on('error', e => {
 console.log(`Oops! ${e}`);
})

//Discord.Board
const BOATS = require('boats.js');
const Boats = new BOATS(config.BOATS);
Boats.postStats(client.guilds.cache.size, config.BotID).then(() => {
    console.log('Nombre de serveurs mis à jour avec succès.')
}).catch((err) => {
    console.error(err)
});

//VoidBots
fetch(`https://voidbots.net/api/auth/stats/${config.BotID}`, {
    method: "POST",
    headers: { 
      Authorization: ""+config.VoidBots+"",
      "Content-Type": "application/json"
    },
    body: JSON.stringify({"server_count": client.guilds.cache.size })
  }).then(response => response.text())
.then(console.log).catch(console.error);

//Space Bot List
snekfetch.post(`https://space-bot-list.xyz/api/bots/${config.BotID}`)
    .set('Authorization', ""+config.SpaceBotList+"")
    .send({ guilds: client.guilds.cache.size, users: client.users.cache.size })
    .then(req => req.body);

process.on('unhandledRejection', err => client.logger.error(err));
