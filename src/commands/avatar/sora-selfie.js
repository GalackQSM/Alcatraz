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
const { createCanvas, loadImage } = require('canvas');
const request = require('node-superfetch');
const path = require('path');

module.exports = class SoraSelfieCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sora-selfie',
            type: client.types.AVATAR,
			description: 'Dessine un avatar d\'un utilisateur derrière Sora prenant un selfie.',
			throttling: {
				usages: 1,
				duration: 10
			},
			clientPermissions: ['ATTACH_FILES'],
			args: [
				{
					key: 'image',
					type: 'image',
					default: msg => member.author.displayAvatarURL({ format: 'png', size: 512 })
				}
			]
		});
	}

	async run(msg, { image, args}) {
      const member =  this.getMemberFromMention(msg, args) || 
      msg.guild.members.cache.get(args) || 
      msg.member;
        const avatarURL = member.user.displayAvatarURL({ format: 'png', size: 512 });
		try {
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'sora-selfie.png'));
            const { body } = await request.get(avatarURL);
			const data = await loadImage(body);
			const canvas = createCanvas(base.width, base.height);
			const ctx = canvas.getContext('2d');
			ctx.fillStyle = 'black';
			ctx.fillRect(0, 0, base.width, base.height);
			const ratio = data.width / data.height;
			const width = Math.round(base.height * ratio);
			ctx.drawImage(data, (base.width / 2) - (width / 2), 0, width, base.height);
			ctx.drawImage(base, 0, 0);
			return msg.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'sora-selfie.png' }] });
		} catch (err) {
			return msg.channel.send(`Oh non, une erreur s'est produite: \`${err.message}\`. Réessayez plus tard!`);
		}
	}
};
