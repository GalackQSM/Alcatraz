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
const config = require('../../../config.json');

module.exports = class SondageCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'sondage',
      usage: 'sondage <message>',
      description: 'Crée des sondage.',
      type: client.types.MOD,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'KICK_MEMBERS'],
      userPermissions: ['MANAGE_GUILD'],
      examples: ['sondage Aime-tu Alcatraz ?']
    });
  }

  hasPermission(message) {
    return message.member.hasPermission('ADMINISTRATOR', { checkOwner: false });
  }

  async run(message, args) {
        const msg = args.join(' ');
    if (!msg) return this.sendErrorMessage(message, 0, 'Veuillez fournir un message.');

    let firstReaction, secondReaction;
    if (message.guild.id === '775902680454922271'){
        firstReaction = '776109858948120636';
        secondReaction = '776495050406101093';  
      } else {
        firstReaction = '<:alcatraz_valider:776109858948120636>';
        secondReaction = '<:alcatraz_error:776495050406101093>';
      }
      let pollEmbed = new MessageEmbed()
      .setTitle(""+emojis.sondage+" Nouveau sondage:")
      .setDescription(msg)
      .setFooter(config.footer)
      .setTimestamp()
      .setColor("#2f3136");


      try{
        message.channel.send({embed: pollEmbed}).then(sentEmbed => {
        message.delete();
        sentEmbed.react(firstReaction);
        sentEmbed.react(secondReaction);
      });
    } catch{
      message.channel.send("Oh oh! Une erreur s'est produite lors de la tentative de création d'un sondage!");
      return;
    }
    
      
  }
};
