const Botinfo = require('../models/bots')
const {MessageEmbed} = require('discord.js')

module.exports = {
    name:'approve',
    description: 'Approve a bot',

    async execute(client, message, args){
    const embed = new MessageEmbed()
		const adminRole = message.guild.roles.cache.find(role => role.name === "Bot Reviewer")
		if (!adminRole) {
			embed.setDescription("Role not found!")
			return;
		}
    		if (!message.member.roles.cache.has(adminRole.id)) {
			embed.setDescription("<:RedX:917792603829829692> We have checked your roles, and apparently you don't have the proper roles for this command. If this is a problem, please go to our [Bug Report Page](https://discordlists100.xyz/bug) and submit a request! Or you may email our support team at `help@support.discordlists100.xyz` directly.")
			message.channel.send(embed)
			return;
		}
       if(!args[0]){
           message.channel.send({
               embed:{
                   color:'RED',
                   title:'Error:',
                   description:'You must type a valid bot ID'
               }
           })
           return
       }
       const channel = client.channels.cache.get(process.env.LOGS_CHANNEL)
       const bot = await Botinfo.findOne({ botid: args[0] })
       if(!bot){
           message.channel.send({
               embed:{
                   color:'RED',
                   title:'Error:',
                   description: 'We cannot find that bot id in our system.'
               }
           })
           return
       }
       await Botinfo.findOneAndUpdate(
           {
               botid: `${args[0]}` 
           },
           {
               state: `verified`
           }
       )
       channel.send({
           embed:{
               color:'GREEN',
               title:'Bot Approved:',
               description: `<@${args[0]}> approved.\n\nReviewer: <@${message.author.id}>`,
           }
       })
       message.channel.send({
           embed:{
               color:'GREEN',
               description:`<@${args[0]}> was approved`
           }
       })
    }
}