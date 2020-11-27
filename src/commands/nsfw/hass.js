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
const emojis = require('../../utils/emojis.json');
const fetch = require("node-fetch");
const { oneLine, stripIndent } = require('common-tags');
const ror = require("@spyte-corp/discord.js-remove-on-reaction");
const config = require('../../../config.json');

module.exports = class HassCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'hass',
      usage: 'hass',
      description: oneLine`
        Affiche une image NSFW.
      `,
      type: client.types.NSFW,
    });
  }
  run(message, args) {
        const embed = new MessageEmbed().setColor(0x00FFFF);
        if (!message.channel.nsfw) {
            embed.setTitle(''+emojis.nsfw+' NSFW')
            .setDescription("Impossible d'afficher le contenu NSFW dans un salon SFW.")
            .setFooter(config.footer)
            .setTimestamp()
            .setColor("#2f3136");

            return message.channel.send({embed});
        }
        message.channel.startTyping();
        fetch(`https://nekobot.xyz/api/image?type=hass`)
            .then(res => res.json())
            .then(data => {
                embed.setImage(data.message)
                embed.setTitle(''+emojis.nsfw+' '+message.author.username+' voici votre image Hass')
                embed.setFooter(config.footer)
                embed.setTimestamp()
                embed.setColor("#2f3136");

                message.channel.send({embed}).then(msg => { 
                    ror(message, msg, true);
                    msg.react("🗑");
                });
            })
            .catch(err => {
                this.client.logger.error(err.stack);
                message.channel.stopTyping(true);
                return this.client.embed("APIError", message);
            });
        message.channel.stopTyping(true);
    }
};