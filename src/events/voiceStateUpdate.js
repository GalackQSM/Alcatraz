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

module.exports = (client, oldState, newState) => {
  
  if (oldState.member != newState.member) return;
  const member = newState.member;
  
  const { point_tracking: pointTracking, voice_points: voicePoints } = 
    client.db.settings.selectPoints.get(member.guild.id);
  if (!pointTracking || voicePoints == 0) return;

  const oldId = oldState.channelID;
  const newId = newState.channelID;
  const afkId = member.guild.afkChannelID;

  if (oldId === newId) return;
  else if ((!oldId || oldId === afkId) && newId && newId !== afkId) { 
    member.interval = setInterval(() => {
      client.db.users.updatePoints.run({ points: voicePoints }, member.id, member.guild.id);
    }, 60000);
  } else if (oldId && (oldId !== afkId && !newId || newId === afkId)) { 
    clearInterval(member.interval);
  }
};