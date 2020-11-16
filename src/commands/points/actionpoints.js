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
const { stripIndent } = require('common-tags');
const config = require('../../../config.json');

module.exports = class PointPerCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'actionpoints',
      aliases: ['actpoint', 'ap'],
      usage: 'actionpoints',
      description: 'Affiche le nombre de points gagnés par action.',
      type: client.types.POINTS
    });
  }
  run(message) {
    
    const { message_points: messagePoints, command_points: commandPoints, voice_points: voicePoints } 
      = message.client.db.settings.selectPoints.get(message.guild.id);
    const pointsPer = stripIndent`
      Points de message :: ${messagePoints} par message
      Points de commande :: ${commandPoints} par commande
      Points de vaocal   :: ${voicePoints} par minute
    `;

    const embed = new MessageEmbed()
      .setTitle('Points par action')
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription(`\`\`\`asciidoc\n${pointsPer}\`\`\``)
      .setFooter(config.footer)
      .setTimestamp()
      .setColor("#2f3136");
    message.channel.send(embed);
  }
};