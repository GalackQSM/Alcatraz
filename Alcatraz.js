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
            .setTitle("`➕` Alcatraz a rejoint un serveur")
            .setDescription("Merci à **"+ guild.owner.user.tag +"** de m'avoir ajouté dans son serveur, je suis maintenant dans **"+ client.guilds.cache.size +" serveurs**.\n\n__Informations du serveur :__\n• :pencil: **Nom:** "+ guild.name +"\n• :earth_americas: **Region:** " +guild.region +"\n• :mortar_board: **Rôles:** "+guild.roles.cache.size+"\n• :man_detective: **Membres:** "+guild.memberCount+"\n• :id: **ID:** "+guild.id+"\n• :crown: **Propriétaire:** "+ guild.owner.user.tag +"")
            .setTimestamp()
            .setColor("1fd10f")
            .setFooter("© 2020 - Alcatraz | Projet open-source")
        
            canal.send({ embed });
        });

    client.on('guildDelete', async guild => {

        let canal = client.channels.cache.get("775339804765454396")

        const embed = new Discord.MessageEmbed()
        .setThumbnail(guild.iconURL)
        .setTitle("`➖` Alcatraz a quitté un serveur")
        .setDescription("Dommage **"+ guild.owner.user.tag +"** viens de m'exclure de son serveur, je ne suis plus que dans **"+ client.guilds.cache.size +" serveurs**.\n\n__Informations du serveur :__\n• :pencil: **Nom:** "+ guild.name +"\n• :earth_americas: **Region:** " +guild.region +"\n• :mortar_board: **Rôles:** "+guild.roles.cache.size+"\n• :man_detective: **Membres:** "+guild.memberCount+"\n• :id: **ID:** "+guild.id+"\n• :crown: **Propriétaire:** "+ guild.owner.user.tag +"")
        .setTimestamp()
        .setColor("d90e0b")
        .setFooter("© 2020 - Alcatraz | Projet open-source")
        
            canal.send({ embed });
        });

process.on('unhandledRejection', err => client.logger.error(err));
