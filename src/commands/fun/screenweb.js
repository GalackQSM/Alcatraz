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
 discord = require("discord.js");
const request = require('node-superfetch');

module.exports = class ScreenwebCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'screenweb',
      usage: 'screenweb <URL>',
      description: 'Avoir un screen d\'un site web.',
      type: client.types.FUN,
      examples: ['screenweb https://discord.com']
    });
  }

  async run(message, args) {
    try {
      if (args.length !== 0) {
        const { body } = await request.get(`https://image.thum.io/get/width/1920/crop/675/noanimate/${args[0]}`);
        return message.channel.send({ files: [{ attachment: body, name: 'screenshot.png' }] });
      } else {
        return message.reply("Utilisation de la commande: `screenweb <URL>`")
      }
    } catch (err) {
      return message.reply(`Oh non, une erreur s'est produite: \`${err.message}\`.`);
    }
  }
};

