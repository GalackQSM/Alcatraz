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
const ReactionMenu = require('../ReactionMenu.js');
const { MessageEmbed } = require('discord.js');
const config = require('../../../config.json');

module.exports = class EmojisCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'emojis',
      aliases: ['e'],
      usage: 'emojis',
      description: 'Affiche une liste de tous les emojis actuels.',
      type: client.types.INFO
    });
  }
  run(message) {

    const emojis = [];
    message.guild.emojis.cache.forEach(e => emojis.push(`${e} **-** \`:${e.name}:\``));

    const embed = new MessageEmbed()
      .setTitle(`Listes de emojis [${message.guild.emojis.cache.size}]`)
      .setFooter(config.footer)
      .setTimestamp()
      .setColor("#2f3136");

    let max = 25;
    if (emojis.length === 0) message.channel.send(embed.setDescription('Désolé! Aucun émojis trouvé 😢'));
    else if (emojis.length <= max) {
      const range = (emojis.length == 1) ? '[1]' : `[1 - ${emojis.length}]`;
      message.channel.send(embed
        .setTitle(`Listes des emojis ${range}`)
        .setDescription(emojis.join('\n'))
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
      );
    
    } else {

      let n = 0;
      embed
        .setTitle(`Listes des emojis [1 - ${max}]`)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setFooter(
          'Expire après deux minutes.\n' + message.member.displayName,  
          message.author.displayAvatarURL({ dynamic: true })
        )
        .setDescription(emojis.slice(n, max).join('\n'));

      const json = embed.toJSON();

      const previous = () => {
        if (n === 0) return;
        n -= 25;
        max -= 25;
        if (max < 25) max = 25;
        return new MessageEmbed(json)
          .setTitle(`Liste des emojis [${n + 1} - ${max}]`)
          .setDescription(emojis.slice(n, max).join('\n'));
      };

      const next = () => {
        if (max === emojis.length) return;
        n += 25;
        max += 25;
        if (max >= emojis.length) max = emojis.length;
        return new MessageEmbed(json)
          .setTitle(`Listes de emojis [${n + 1} - ${max}]`)
          .setDescription(emojis.slice(n, max).join('\n'));
      };

      const reactions = {
        '◀️': previous,
        '▶️': next,
      };

      new ReactionMenu(message.channel, message.member, embed, reactions);
    }
  }
};
