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
const he = require('he');
  Discord = require("discord.js");
const config = require('../../../config.json');

module.exports = class Fakeban extends Command {
  constructor (client) {
    super(client, {
      name: 'fakeban',
      usage: 'fakeban @membre',
      description: 'Banni une membre pour rigoler',
      type: client.types.FUN,
      examples: ['fakeban @GalackQSM']

    });
  }

    async run(message, args, level) { 
        const user = message.mentions.members.first();
        if (!user) return message.reply("Vous devez mentionner une personne !");

        const member = message.member;
        const fakeban = [
            `https://media1.tenor.com/images/459e6388894ecf845ee7db65476d153e/tenor.gif`
        ]
         const embed = new MessageEmbed()
        .setDescription(`**${member.user.username}** vous avez banni **${user.user.username}**`, message.author.avatarURL)
        .setImage(fakeban[Math.floor(Math.random() * fakeban.length)])
        .setFooter(config.footer)
        .setTimestamp()
        .setColor("#2f3136")

        message.channel.send(embed)
    }
};