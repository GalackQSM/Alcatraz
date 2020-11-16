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

const { MessageEmbed } = require('discord.js');
module.exports = class ReactionMenu {
  constructor(client, channel, member, embed, arr = null, interval = 10, reactions = {
    '⏪': this.first.bind(this), 
    '◀️': this.previous.bind(this), 
    '▶️': this.next.bind(this), 
    '⏩': this.last.bind(this), 
    '⏹️': this.stop.bind(this)
  }, timeout = 120000) {
    this.client = client;
    this.channel = channel;
    this.memberId = member.id;
    this.embed = embed;
    this.json = this.embed.toJSON();
    this.arr = arr;
    this.interval = interval;
    this.current = 0;
    this.max = (this.arr) ? arr.length : null;
    this.reactions = reactions;
    this.emojis = Object.keys(this.reactions);
    this.timeout = timeout;

    const first = new MessageEmbed(this.json);
    const description = (this.arr) ? this.arr.slice(this.current, this.interval) : null;
    if (description) first
      .setTitle(this.embed.title + ' ' + this.client.utils.getRange(this.arr, this.current, this.interval))
      .setDescription(description);

    this.channel.send(first).then(message => {
      this.message = message;

      this.addReactions();
      this.createCollector();
    });
  }

  async addReactions() {
    for (const emoji of this.emojis) {
      await this.message.react(emoji);
    }
  }
  createCollector() {
    
    const collector = this.message.createReactionCollector((reaction, user) => {
      return (this.emojis.includes(reaction.emoji.name) || this.emojis.includes(reaction.emoji.id)) &&
        user.id == this.memberId;
    }, { time: this.timeout });
    
    collector.on('collect', async reaction => {
      let newPage =  this.reactions[reaction.emoji.name] || this.reactions[reaction.emoji.id];
      if (typeof newPage === 'function') newPage = newPage();
      if (newPage) await this.message.edit(newPage);
      await reaction.users.remove(this.memberId);
    }); 

    collector.on('end', () => {
      this.message.reactions.removeAll();
    });

    this.collector = collector;
  }
  first() {
    if (this.current === 0) return;
    this.current = 0;
    return new MessageEmbed(this.json)
      .setTitle(this.embed.title + ' ' + this.client.utils.getRange(this.arr, this.current, this.interval))
      .setDescription(this.arr.slice(this.current, this.current + this.interval));
  }
  previous() {
    if (this.current === 0) return;
    this.current -= this.interval;
    if (this.current < 0) this.current = 0;
    return new MessageEmbed(this.json)
      .setTitle(this.embed.title + ' ' + this.client.utils.getRange(this.arr, this.current, this.interval))
      .setDescription(this.arr.slice(this.current, this.current + this.interval));
  }
  next() {
    const cap = this.max - (this.max % this.interval);
    if (this.current === cap || this.current + this.interval === this.max) return;
    this.current += this.interval;
    if (this.current >= this.max) this.current = cap;
    const max = (this.current + this.interval >= this.max) ? this.max : this.current + this.interval;
    return new MessageEmbed(this.json)
      .setTitle(this.embed.title + ' ' + this.client.utils.getRange(this.arr, this.current, this.interval))
      .setDescription(this.arr.slice(this.current, max));
  }
  last() {
    const cap = this.max - (this.max % this.interval);
    if (this.current === cap || this.current + this.interval === this.max) return;
    this.current = cap;
    if (this.current === this.max) this.current -= this.interval;
    return new MessageEmbed(this.json)
      .setTitle(this.embed.title + ' ' + this.client.utils.getRange(this.arr, this.current, this.interval))
      .setDescription(this.arr.slice(this.current, this.max));
  }
  stop() {
    this.collector.stop();
  }
};