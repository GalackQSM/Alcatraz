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
const config = require('../../../config.json');

module.exports = class FindIdCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'findid',
      aliases: ['find', 'id'],
      usage: 'findid <@membre/@rôle/#salon>',
      description: 'Recherche l\'ID de l\'utilisateur, du rôle ou du salon de texte mentionné.',
      type: client.types.INFO,
      examples: ['findid @Alcatraz ', 'findid #salon']
    });
  }
  run(message, args) {
    const target = this.getMemberFromMention(message, args[0]) || 
      this.getRoleFromMention(message, args[0]) || 
      this.getChannelFromMention(message, args[0]);
    if (!target) 
      return this.sendErrorMessage(message, 0, 'Veuillez mentionner un utilisateur, un rôle ou un salon de texte');
    const id = target.id;
    const embed = new MessageEmbed()
      .setTitle('Trouver l\'ID')
      .addField('Recherche', target, true)
      .addField('ID', `\`${id}\``, true)
      .setFooter(config.footer)
      .setTimestamp()
      .setColor("#2f3136");
    message.channel.send(embed);
  }
};