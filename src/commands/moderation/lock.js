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

module.exports = class LockCommand extends Command {
    constructor(client) {
        super(client, {
      name: 'lock',
      usage: 'lock <activer/désactiver>',
      description: 'Permet de bloquée le salon.',
      type: client.types.MOD,
      clientPermissions: ['SEND_MESSAGES', 'EMBED_LINKS', 'BAN_MEMBERS'],
      userPermissions: ['MANAGE_CHANNELS'],
      examples: ['lock activer']
        })
    }
    async run(message, args) {

        if (!args[0]) return message.channel.send("Choisir entre `activer` ou `désactiver`")

        if (args[0] == "activer") {
            message.channel.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: false
            }).then(g => {
                g.edit({
                    name: g.name + ' 🔒'
                })
                g.send(`🔒 | Le salon a été bloquée par ${message.author}`)
            })
        } else if(args[0] == "désactiver") {
            message.channel.updateOverwrite(message.guild.roles.everyone, {
                SEND_MESSAGES: null
            }).then(g => {
                g.edit({
                    name: g.name.replace(/\s*🔒/, '')
                })
                g.send(`🔓 | Salon déverrouillée avec succès`)
            })
        } else message.reply("Option invalide")
    }
}
