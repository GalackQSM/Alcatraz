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

module.exports = class WarnsCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'warnlist',
      usage: 'warnlist <@membre/ID>',
      description: 'Affiche les avertissements actuels d\'un membre. Un maximum de 5 avertissements peut être affiché à la fois.',
      type: client.types.MOD,
      userPermissions: ['KICK_MEMBERS'],
      examples: ['warnlist @GalackQSM']
    });
  }
  run(message, args) {

    const member = this.getMemberFromMention(message, args[0]) || message.guild.members.cache.get(args[0]);
    if (!member) 
      return this.sendErrorMessage(message, 0, 'Veuillez mentionner un utilisateur ou fournir un ID utilisateur valide');

    let warns = message.client.db.users.selectWarns.pluck().get(member.id, message.guild.id) || { warns: [] };
    if (typeof(warns) == 'string') warns = JSON.parse(warns);
    const count = warns.warns.length;

    const embed = new MessageEmbed()
      .setAuthor(member.user.tag, member.user.displayAvatarURL({ dynamic: true }))
      .setFooter(config.footer)
      .setTimestamp()
      .setColor(message.guild.me.displayHexColor);
    
    const buildEmbed = (current, embed) => {
      const max = (count > current + 5) ? current + 5 : count;
      let amount = 0;
      for (let i = current; i < max; i++) {
        embed 
          .addField('\u200b', `**Avertissements \`#${i + 1}\`**`)
          .addField('Raison', warns.warns[i].reason)
          .addField(
            'Par', 
            message.guild.members.cache.get(warns.warns[i].mod) || '`Impossible de trouver le modérateur`',
            true
          )
          .addField('Date d\'émission', warns.warns[i].date, true);
        amount += 1;
      }

      return embed
        .setTitle('Liste d\'avertissement ' + this.client.utils.getRange(warns.warns, current, 5))
        .setDescription(`Liste de \`${amount}\` de ${member} \`${count}\` total d\'avertissement(s).`);
    };

    if (count == 0) message.channel.send(embed
      .setTitle('Liste d\'avertissement [0]')
      .setDescription(`${member} n'a actuellement aucun avertissement.`)
    );
    else if (count < 5) message.channel.send(buildEmbed(0, embed));
    else {

      let n = 0;
      const json = embed.setFooter(
        'Expire après trois minutes.\n' + message.member.displayName, 
        message.author.displayAvatarURL({ dynamic: true })
      ).toJSON();
      
      const first = () => {
        if (n === 0) return;
        n = 0;
        return buildEmbed(n, new MessageEmbed(json));
      };

      const previous = () => {
        if (n === 0) return;
        n -= 5;
        if (n < 0) n = 0;
        return buildEmbed(n, new MessageEmbed(json));
      };

      const next = () => {
        const cap = count - (count % 5);
        if (n === cap || n + 5 === count) return;
        n += 5;
        if (n >= count) n = cap;
        return buildEmbed(n, new MessageEmbed(json));
      };

      const last = () => {
        const cap = count - (count % 5);
        if (n === cap || n + 5 === count) return;
        n = cap;
        if (n === count) n -= 5;
        return buildEmbed(n, new MessageEmbed(json));
      };

      const reactions = {
        '⏪': first,
        '◀️': previous,
        '▶️': next,
        '⏩': last,
        '⏹️': null,
      };

      const menu = new ReactionMenu(
        message.client,
        message.channel, 
        message.member, 
        buildEmbed(n, new MessageEmbed(json)), 
        null,
        null,
        reactions, 
        180000
      );

      menu.reactions['⏹️'] = menu.stop.bind(menu);

    }
  }
};
