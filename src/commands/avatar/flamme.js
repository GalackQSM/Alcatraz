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
const { drawImageWithTint } = require('../../../util/Canvas');

module.exports = class FlammeCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'flamme',
			aliases: ['flammes'],
            type: client.types.AVATAR,
			description: 'Dessine une bordure de flamme sur l\'avatar d\'un utilisateur.',
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
			const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'flamme.png'));
            const { body } = await request.get(avatarURL);
			const data = await loadImage(body);
			const canvas = createCanvas(data.width, data.height);
			const ctx = canvas.getContext('2d');
			drawImageWithTint(ctx, data, '#fc671e', 0, 0, data.width, data.height);
			ctx.drawImage(base, 0, 0, data.width, data.height);
			const attachment = canvas.toBuffer();
			if (Buffer.byteLength(attachment) > 8e+6) return msg.reply('L\'image résultante était supérieure à 8 Mo.');
			return msg.channel.send({ files: [{ attachment, name: 'flamme.png' }] });
		} catch (err) {
			return msg.channel.send(`Oh non, une erreur s'est produite: \`${err.message}\`. Réessayez plus tard!`);
		}
	}
};