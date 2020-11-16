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
const { MessageEmbed } = require('discord.js');
const { oneLine } = require('common-tags');
const emojis = require('../../utils/emojis.json');
const config = require('../../../config.json');

module.exports = class GitHubCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'github',
      aliases: ['gh', 'repo'],
      usage: 'github',
      description: 'Affiche le lien vers le référentiel GitHub d\'Alcatraz.',
      type: client.types.INFO
    });
  }
  run(message) {
    const embed = new MessageEmbed()
      .setTitle(''+emojis.github+' Lien GitHub')
      .setThumbnail(message.guild.iconURL())
      .setDescription(oneLine`
        [Clique ici](https://github.com/GalackQSM/Alcatraz) pour visiter mon référentiel GitHub!
        S'il vous plaît, soutenez-moi en mettant en vedette ⭐ le repo, et n'hésitez pas à commenter des problèmes ou des suggestions!
      `)
      .addField(''+emojis.liens+' Liens', '**[Ajouter Alcatraz](https://discordapp.com/oauth2/authorize?client_id=774652242787041310&scope=bot&permissions=2146958847) | '+'[Alcatraz Empire](https://discord.gg/aGP5kvxFEc) | '+'[Github](https://github.com/GalackQSM/Alcatraz) | '+'[SiteWeb](https://alcatraz-bot.com)**')
      .setFooter(config.footer)
      .setTimestamp()
      .setColor("#2f3136");
    message.channel.send(embed);
  }
};
