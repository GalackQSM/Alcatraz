module.exports = (client, oldGuild, newGuild) => {
  
  if (oldGuild.name == newGuild.name) return;
  
  client.db.settings.updateGuildName.run(newGuild.name, oldGuild.id);
  client.db.users.updateGuildName.run(newGuild.name, oldGuild.id);

  client.logger.info(`${oldGuild.name} le nom du serveur est devenu ${newGuild.name}`);
};
