const { MessageEmbed } = require('discord.js');

module.exports = (client, message) => {
  
  if (message.webhookID || (!message.content && message.embeds.length === 0)) return;
  
  const embed = new MessageEmbed()
    .setTitle('Mise à jour du message: `Supprimer`')
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL({ dynamic: true }))
    .setTimestamp()
    .setColor(message.guild.me.displayHexColor);
  
  if (message.content) {

    const starboardChannelId = client.db.settings.selectStarboardChannelId.pluck().get(message.guild.id);
    const starboardChannel = message.guild.channels.cache.get(starboardChannelId);
    if (message.channel == starboardChannel) return;

    const messageDeleteLogId = client.db.settings.selectMessageDeleteLogId.pluck().get(message.guild.id);
    const messageDeleteLog = message.guild.channels.cache.get(messageDeleteLogId);
    if (
      messageDeleteLog &&
      messageDeleteLog.viewable &&
      messageDeleteLog.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
    ) {

      if (message.content.length > 1024) message.content = message.content.slice(0, 1021) + '...';

      embed
        .setDescription(`${message.member} les **message** dans ${message.channel} ont été supprimés.`)
        .addField('Message', message.content);
        
      messageDeleteLog.send(embed);
    }

  } else { 

    const messageDeleteLogId = client.db.settings.selectMessageDeleteLogId.pluck().get(message.guild.id);
    const messageDeleteLog = message.guild.channels.cache.get(messageDeleteLogId);
    if (
      messageDeleteLog &&
      messageDeleteLog.viewable &&
      messageDeleteLog.permissionsFor(message.guild.me).has(['SEND_MESSAGES', 'EMBED_LINKS'])
    ) {

      embed
        .setTitle('Mise à jour du message: `Supprimer`')
        .setDescription(`${message.member} les **message embed** dans ${message.channel} ont été supprimés.`);
      messageDeleteLog.send(embed);
    }
  }
  
};
