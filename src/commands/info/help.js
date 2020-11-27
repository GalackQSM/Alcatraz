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
const MenuReac = require('../../../MenuReac.js');
const { MessageEmbed } = require('discord.js');
const { oneLine, stripIndent } = require('common-tags');
const config = require('../../../config.json');
const emojis = require('../../utils/emojis.json');

module.exports = class HelpCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'help',
      usage: 'help [commande]',
      description: oneLine`
        Affiche une liste de toutes les commandes actuelles, triées par catégorie.
        Peut être utilisé en conjonction avec une commande pour plus d'informations.
      `,
      type: client.types.INFO,
      examples: ['help ping']
    });
  }
  run(message, args) {

    let disabledCommands = message.client.db.settings.selectDisabledCommands.pluck().get(message.guild.id) || [];
    if (typeof(disabledCommands) === 'string') disabledCommands = disabledCommands.split(' ');

    const prefix = message.client.db.settings.selectPrefix.pluck().get(message.guild.id); 
    const { capitalize } = message.client.utils;
    
    const command = message.client.commands.get(args[0]) || message.client.aliases.get(args[0]);
    if (command && command.type != message.client.types.OWNER && !disabledCommands.includes(command.name)) {
      
      const embed = new MessageEmbed() 
        .setTitle(`Information de la commandes: \`${command.name}\``)
        .setThumbnail(message.guild.iconURL({ dynamic: true }))
        .setDescription(command.description)
        .addField('Usage', `\`${prefix}${command.usage}\``, true)
        .addField('Catégorie', `\`${capitalize(command.type)}\``, true)
        .setFooter(config.footer)
        .setTimestamp()
        .setColor("#2f3136");
      if (command.aliases) embed.addField('Aliases', command.aliases.map(c => `\`${c}\``).join(' '));
      if (command.examples) embed.addField('Exemples', command.examples.map(c => `\`${prefix}${c}\``).join('\n'));

      message.channel.send(embed);

    } else if (args.length > 0) {
      return this.sendErrorMessage(message, `Impossible de trouver la commande \`${args[0]}\`. Veuillez saisir une commande valide.`);

    } else {

      const commands = {};
      for (const type of Object.values(message.client.types)) {
        commands[type] = [];
      }

      const { INFO, FUN, COULEUR, POINTS, NFSW, GENERAL, JEUX, AVATAR, BACKUP, MOD, ADMIN, OWNER } = message.client.types;
      const emojis = [
        '<:alcatraz_afk:776109851159298082>',
        '<:alcatraz_fun:776109856578338864>',
        '<:alcatraz_color:776109859145252935>',
        '<:alcatraz_points:776109859178807306>',
        '<:alcatraz_nsfw:776109859010510868>',
        '<:alcatraz_misc:776109858927411231>',
        '<:alcatraz_emojis:776186958120091668>',
        '<:alcatraz_pseudo:776109859568353321>',
        '<:alcatraz_utilitaire:779753030597476373>',
        '<:alcatraz_mod:776109858889924669>',
        '<:alcatraz_admin:776109851175813170>',
        '<:alcatraz_owner:776109858948251658>'
      ];

      message.client.commands.forEach(command => {
        if (!disabledCommands.includes(command.name)) commands[command.type].push(`\`${command.name}\`,`);
      });

      const json = new MessageEmbed()
        .setTitle(`Panel des commandes de ${config.NomBot}`)
        .setDescription(stripIndent`
          **Prefix:** \`${prefix}\`
          **Plus d'information:** \`${prefix}help [commande]\`
          **Nombre de commandes:** \`${message.client.commands.size}\`
        `)
        .addField(`<:alcatraz_liens:776109858197209109> Liens`, `**[Ajouter ${config.NomBot}](https://discordapp.com/oauth2/authorize?client_id=${config.BotID}&scope=bot&permissions=2146958847) | [${config.NomServeur}](${config.Support}) | [Github](https://github.com/GalackQSM/Alcatraz) | [SiteWeb](https://alcatraz-bot.com) | [Dons](https://www.patreon.com/AlcatrazBot) | [Vote](https://top.gg/bot/${config.BotID}/vote)**`)
        .setFooter(config.footer)
        .setTimestamp()
        .setColor("#2f3136");

      const embed = new MessageEmbed() 
        .setTitle(`Commandes de ${config.NomBot}`)
        .setThumbnail('')
        .addField(`${emojis[0]} ${capitalize(INFO)}`, `\`${commands[INFO].length}\` commandes`, true)
        .addField(`${emojis[1]} ${capitalize(FUN)}`, `\`${commands[FUN].length}\` commandes`, true)
        .addField(`${emojis[2]} ${capitalize(COULEUR)}`, `\`${commands[COULEUR].length}\` commandes`, true)
        .addField(`${emojis[3]} ${capitalize(POINTS)}`, `\`${commands[POINTS].length}\` commandes`, true)
        .addField(`${emojis[4]} ${capitalize(NFSW)}`, `\`${commands[NFSW].length}\` commandes`, true)
        .addField(`${emojis[5]} ${capitalize(GENERAL)}`, `\`${commands[GENERAL].length}\` commandes`, true)
        .addField(`${emojis[6]} ${capitalize(JEUX)}`, `\`${commands[JEUX].length}\` commandes`, true)
        .addField(`${emojis[7]} ${capitalize(AVATAR)}`, `\`${commands[AVATAR].length}\` commandes`, true)
        .addField(`${emojis[8]} ${capitalize(BACKUP)}`, `\`${commands[BACKUP].length}\` commandes`, true)
        .addField(`${emojis[9]} ${capitalize(MOD)}`, `\`${commands[MOD].length}\` commandes`, true)
        .addField(`${emojis[10]} ${capitalize(ADMIN)}`, `\`${commands[ADMIN].length}\` commandes`, true)
        .addField(`${emojis[11]} ${capitalize(OWNER)}`, `\`${commands[OWNER].length}\` commandes`, true)
        .addField(`<:alcatraz_liens:776109858197209109> Liens`, `**[Ajouter ${config.NomBot}](https://discordapp.com/oauth2/authorize?client_id=${config.BotID}&scope=bot&permissions=2146958847) | [${config.NomServeur}](${config.Support}) | [Github](https://github.com/GalackQSM/Alcatraz) | [SiteWeb](https://alcatraz-bot.com) | [Dons](https://www.patreon.com/AlcatrazBot) | [Vote](https://top.gg/bot/${config.BotID}/vote)**`)
        .setFooter(config.footer)
        .setTimestamp()
        .setImage('https://i.imgur.com/WP9d2Z2.png')
        .setColor("#2f3136");

      const reactions = {
        '776109851159298082': new MessageEmbed(json).spliceFields(0, 0 , { 
          name: `${emojis[0]} ${capitalize(INFO)}`, 
          value: commands[INFO].join(' ')
        }),
        '776109856578338864': new MessageEmbed(json).spliceFields(0, 0 , { 
          name: `${emojis[1]} ${capitalize(FUN)}`, 
          value: commands[FUN].join(' ')
        }),
        '776109859145252935': new MessageEmbed(json).spliceFields(0, 0 , { 
          name: `${emojis[2]} ${capitalize(COULEUR)}`, 
          value: commands[COULEUR].join(' ')
        }),
        '776109859178807306': new MessageEmbed(json).spliceFields(0, 0 , { 
          name: `${emojis[3]} ${capitalize(POINTS)}`, 
          value: commands[POINTS].join(' ')
        }),
        '776109859010510868': new MessageEmbed(json).spliceFields(0, 0 , { 
          name: `${emojis[4]} ${capitalize(NFSW)}`, 
          value: commands[NFSW].join(' ')
        }),
        '776109858927411231': new MessageEmbed(json).spliceFields(0, 0 , { 
          name: `${emojis[5]} ${capitalize(GENERAL)}`, 
          value: commands[GENERAL].join(' ')
        }),
        '776186958120091668': new MessageEmbed(json).spliceFields(0, 0 , { 
          name: `${emojis[6]} ${capitalize(JEUX)}`, 
          value: commands[JEUX].join(' ')
        }),
        '776109859568353321': new MessageEmbed(json).spliceFields(0, 0 , { 
          name: `${emojis[7]} ${capitalize(AVATAR)}`, 
          value: commands[AVATAR].join(' ')
        }),
        '779753030597476373': new MessageEmbed(json).spliceFields(0, 0 , { 
          name: `${emojis[8]} ${capitalize(BACKUP)}`, 
          value: commands[BACKUP].join(' ')
        }),
        '776109858889924669': new MessageEmbed(json).spliceFields(0, 0 , { 
          name: `${emojis[9]} ${capitalize(MOD)}`, 
          value: commands[MOD].join(' ')
        }),
        '776109851175813170': new MessageEmbed(json).spliceFields(0, 0 , { 
          name: `${emojis[10]} ${capitalize(ADMIN)}`, 
          value: commands[ADMIN].join(' ')
        }),
        '776109858948251658': new MessageEmbed(json).spliceFields(0, 0 , { 
          name: `${emojis[11]} ${capitalize(OWNER)}`, 
          value: commands[OWNER].join(' ')
        }),
      };

      new MenuReac(message.channel, message.member, embed, reactions, 180000);
    }
  }
};
