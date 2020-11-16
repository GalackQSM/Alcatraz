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
const config = require('../../../config.json');

module.exports = class FeedbackCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'feedback',
      aliases: ['fb'],
      usage: 'feedback <message>',
      description: 'Envoie un feedback sur le salon.',
      type: client.types.GENERAL,
      examples: ['feedback <votre problème>']
    });
  }
  run(message, args) {
    const feedbackChannel = message.client.channels.cache.get(message.client.feedbackChannelId);
    if (!feedbackChannel) 
      return this.sendErrorMessage(message, 1, 'L\'ID du salon **feedback** dans le fichier **config.js** n\'a pas été définie');
    if (!args[0]) return this.sendErrorMessage(message, 0, 'Veuillez fournir un message à envoyer');
    let feedback = message.content.slice(message.content.indexOf(args[0]), message.content.length);

    const feedbackEmbed = new MessageEmbed()
      .setTitle('Retour d\'information')
      .setThumbnail(feedbackChannel.guild.iconURL({ dynamic: true }))
      .setDescription(feedback)
      .addField('Membre', message.member, true)
      .addField('Serveur', message.guild.name, true)
      .setFooter(config.footer)
      .setTimestamp()
      .setColor("#2f3136");
    feedbackChannel.send(feedbackEmbed);

    if (feedback.length > 1024) feedback = feedback.slice(0, 1021) + '...';
    const embed = new MessageEmbed()
      .setTitle('Retour d\'information')
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription(oneLine`
        Commentaires envoyés avec succès!
        Veuillez rejoindre le serveur [Alcatraz Empire](https://discord.gg/HPtTfqDdMr) pour discuter d'avantage de vos commentaires.
      `) 
      .addField('Membre', message.member, true)
      .addField('Message', feedback)
      .setFooter(config.footer)
      .setTimestamp()
      .setColor("#2f3136");
    message.channel.send(embed);
  }
};