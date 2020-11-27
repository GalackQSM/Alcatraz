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

const Command = require('../Alcatraz.js');
  Discord = require("discord.js");
const config = require('../../../config.json');

class ServersList extends Command {

  constructor (client) {
    super(client, {
      name: 'servers',
      aliases: ['servers-list'],
      usage: 'servers',
      description: 'Affiche la liste liste de serveur ou est Alcatraz.',
      type: client.types.OWNER,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'ADD_REACTIONS']
    });
  }

  async run (message, args, data) {
        
    await message.delete();

    let i0 = 0;
    let i1 = 10;
    let page = 1;

    let description = 
        `Serveurs: ${this.client.guilds.cache.size}\n\n`+
    this.client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
      .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Membres`)
      .slice(0, 10)
      .join("\n");

    const embed = new Discord.MessageEmbed()
      .setAuthor(message.author.tag, message.author.displayAvatarURL())
      .setColor("#2f3136")
      .setFooter(config.footer)
      .setTitle(`Page: ${page}/${Math.ceil(this.client.guilds.cache.size/10)}`)
      .setDescription(description);

    const msg = await message.channel.send(embed);
        
    await msg.react("⬅");
    await msg.react("➡");
    await msg.react("❌");

    const collector = msg.createReactionCollector((reaction, user) => user.id === message.author.id);

    collector.on("collect", async(reaction) => {

      if(reaction._emoji.name === "⬅") {

        i0 = i0-10;
        i1 = i1-10;
        page = page-1;
                
        if(i0 < 0){
          return msg.delete();
        }
        if(!i0 || !i1){
          return msg.delete();
        }
                
        description = `Serveurs: ${this.client.guilds.cache.size}\n\n`+
        this.client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
          .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Membres`)
          .slice(i0, i1)
          .join("\n");

        embed.setTitle(`Page: ${page}/${Math.round(this.client.guilds.cache.size/10)}`)
          .setDescription(description);
            
        msg.edit(embed);
            
      }

      if(reaction._emoji.name === "➡"){

        i0 = i0+10;
        i1 = i1+10;
        page = page+1;

        if(i1 > this.client.guilds.cache.size + 10){
          return msg.delete();
        }
        if(!i0 || !i1){
          return msg.delete();
        }

        description = `Serveurs: ${this.client.guilds.cache.size}\n\n`+
        this.client.guilds.cache.sort((a,b) => b.memberCount-a.memberCount).map((r) => r)
          .map((r, i) => `**${i + 1}** - ${r.name} | ${r.memberCount} Membres`)
          .slice(i0, i1)
          .join("\n");

        embed.setTitle(`Page: ${page}/${Math.round(this.client.guilds.cache.size/10)}`)
          .setDescription(description);
            
        msg.edit(embed);

      }

      if(reaction._emoji.name === "❌"){
        return msg.delete(); 
      }

      await reaction.users.remove(message.author.id);

    });
  }

}

module.exports = ServersList;