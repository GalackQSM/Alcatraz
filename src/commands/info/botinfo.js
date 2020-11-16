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
const pkg = require(__basedir + '/package.json');
const moment = require('moment');
const emojis = require('../../utils/emojis.json');
const config = require('../../../config.json');
const { oneLine, stripIndent } = require('common-tags');

module.exports = class BotInfoCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'botinfo',
      aliases: ['bot', 'bi'],
      usage: 'botinfo',
      description: 'Récupère les informations et les statistiques de Alcatraz.',
      type: client.types.INFO
    });
  }
  run(message) {
    const owner = message.client.users.cache.get(message.client.ownerId);
    const prefix = message.client.db.settings.selectPrefix.pluck().get(message.guild.id);
    const d = moment.duration(message.client.uptime);
    const days = (d.days() == 1) ? `${d.days()} jour` : `${d.days()} jours`;
    const hours = (d.hours() == 1) ? `${d.hours()} heure` : `${d.hours()} heures`;
    const embed = new MessageEmbed()
      .setTitle('Informations sur Alcatraz')
      .setThumbnail(message.guild.iconURL())
      .setDescription(oneLine`
        Alcatraz est un bot Discord riche en fonctionnalités conçu pour la personnalisation.
        Elle est livrée avec une variété de commandes et un
        multitude de paramètres qui peuvent être adaptés à vos besoins spécifiques.
      `)
      .addField(''+emojis.pseudo+' Pseudo', message.client.user.username, true)
      .addField(''+emojis.discriminateur+' Discriminateur', `\`#${message.client.user.discriminator}\``, true)
      .addField(''+emojis.id+' ID', `\`${message.client.user.id}\``, true)
      .addField(''+emojis.surnom+' Surnom', (message.guild.me.nickname) ? message.guild.me.nickname : '`Aucun`', true)
      .addField(''+emojis.prefix+' Prefix', `\`${prefix}\``, true)
      .addField(''+emojis.members+' Membres détectés', `\`${message.client.users.cache.size - 1}\``, true)
      .addField(''+emojis.servers+' Serveurs', `\`${message.client.guilds.cache.size}\``, true)
      .addField(''+emojis.owner+' Propriétaire', owner, true)
      .addField(''+emojis.uptime+' Disponibilité', `\`${days}\` et \`${hours}\``, true)
      .addField(''+emojis.version+' Version actuelle', `\`${pkg.version}\``, true)
      .addField(''+emojis.library+' Library/Environment', 'Discord.js 12.2.0\nNode.js 12.16.3', true)
      .addField(''+emojis.database+' Database', 'SQLite', true)
      .addField(
        '**'+emojis.liens+' Liens**', 
        '**[Ajouter Alcatraz](https://discordapp.com/oauth2/authorize?client_id=774652242787041310&scope=bot&permissions=2146958847) | ' +
        '[Alcatraz Empire](https://discord.gg/HPtTfqDdMr) | ' +
        '[Github](https://github.com/GalackQSM/Alcatraz)**'
      )
        .setFooter(config.footer)
        .setTimestamp()
        .setColor("#2f3136");
    message.channel.send(embed);
  }
};
