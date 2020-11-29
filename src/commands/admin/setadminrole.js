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

module.exports = class SetAdminRoleCommand extends Command {
  constructor(client) {
    super(client, {
      name: 'setadminrole',
      aliases: ['setar', 'sar'],
      usage: 'setadminrole <role mention/ID>',
      description: 'Définit le `rôle admin` pour votre serveur. Ne fournissez aucun rôle pour effacer le `rôle admin`.',
      type: client.types.ADMIN,
      userPermissions: ['MANAGE_GUILD'],
      examples: ['setadminrole @Admin']
    });
  }
  run(message, args) {
    const adminRoleId = message.client.db.settings.selectAdminRoleId.pluck().get(message.guild.id);
    const oldAdminRole = message.guild.roles.cache.find(r => r.id === adminRoleId) || '`Aucun`';

    const embed = new MessageEmbed()
      .setTitle('Paramètres: Rôle Admin`')
      .setThumbnail(message.guild.iconURL({ dynamic: true }))
      .setDescription('Le `admin role` a été mis à jour avec succès. <:valider:774806924712476674>')
      .setFooter(config.footer)
      .setTimestamp()
      .setColor("#2f3136");

    // Clear if no args provided
    if (args.length === 0) {
      message.client.db.settings.updateAdminRoleId.run(null, message.guild.id);
      return message.channel.send(embed.addField('Role', `${oldAdminRole} ➔ \`Aucun\``));
    }

    // Update role
    const adminRole = this.getRoleFromMention(message, args[0]) || message.guild.roles.cache.get(args[0]);
    if (!adminRole) 
      return this.sendErrorMessage(message, 0, 'Argument invalide. Veuillez mentionner un rôle ou fournir un identifiant de rôle.');
    message.client.db.settings.updateAdminRoleId.run(adminRole.id, message.guild.id);
    message.channel.send(embed.addField('Role', `${oldAdminRole} ➔ ${adminRole}`));
  }
};
