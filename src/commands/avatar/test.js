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
const { createCanvas, loadImage, registerFont } = require('canvas');
const path = require('path');
const { shortenText } = require('../../../util/Canvas');
registerFont(path.join(__dirname, '..', '..', 'assets', 'font', 'Noto-Regular.ttf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', '..', 'assets', 'font', 'Noto-CJK.otf'), { family: 'Noto' });
registerFont(path.join(__dirname, '..', '..', 'assets', 'font', 'Noto-Emoji.ttf'), { family: 'Noto' });

module.exports = class NewPasswordCommand extends Command {
	constructor(client) {
		super(client, {
			name: 'sos',
			throttling: {
				usages: 1,
				duration: 10
			},
			clientPermissions: ['ATTACH_FILES'],
			credit: [
				{
					name: 'Google',
					url: 'https://www.google.com/',
					reason: 'Noto Font',
					reasonURL: 'https://www.google.com/get/noto/'
				}
			],
			args: [
				{
					key: 'weak',
					prompt: 'What should the text of the weak password be?',
					type: 'string',
					max: 50
				},
				{
					key: 'strong',
					prompt: 'What should the text of the strong password be?',
					type: 'string',
					max: 50
				}
			]
		});
	}

	async run(msg, { weak, strong }) {
		const base = await loadImage(path.join(__dirname, '..', '..', 'assets', 'images', 'password.png'));
		const canvas = createCanvas(base.width, base.height);
		const ctx = canvas.getContext('2d');
		ctx.drawImage(base, 0, 0);
		ctx.font = '25px Noto';
		ctx.fillText(shortenText(ctx, weak, 390), 40, 113);
		ctx.fillText(shortenText(ctx, strong, 390), 40, 351);
		return msg.channel.send({ files: [{ attachment: canvas.toBuffer(), name: 'password.png' }] });
	}
};