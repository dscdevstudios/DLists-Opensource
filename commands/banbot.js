const BanBot = require('../models/banned-bots')
const Botinfo = require('../models/bots')
const {MessageEmbed} = require('discord.js')

module.exports = {
  name: "banbot",
  description: "Ban a bot from the list.",
	async execute(client, message, args){
		const embed = new MessageEmbed()
		const logEmbed = new MessageEmbed()
		const adminRole = message.guild.roles.cache.find(role => role.name === "Admin")
		if (!adminRole) {
			embed.setDescription("There was an error on line(s) `10-14`")
			return;
		}

		if (!message.member.roles.cache.has(adminRole.id)) {
			embed.setDescription("<:RedX:896116561176326155> We have checked your roles, and apparently you don't have the proper roles for this command. If this is a problem, please go to our [Bug Report Page](https://discordlists100.xyz/bug) and submit a request! Or you may email our support team at `help@support.discordlists100.xyz` directly.")
			message.channel.send(embed)
			return;
		}

		const logChannel = client.channels.cache.get(process.env.LOGS_CHANNEL)
		const bot = args[0]
		const botIsBanned = false
		const botsinfo = await Botinfo.findOne({ botid: bot })
		const reason = args[1] || "No reason provied"

		const banID = await BanBot.findOne(
			{
				botid: `${bot}`
			}
		)
		if (!bot){
			embed.setTitle("Error")
			embed.setDescription("We cannot find that bot in our systems. Are you sure you gave the proper id?")
			embed.setFooter("If there is a problem, try contacting one of our amazing Developers.")
			embed.setTimestamp()
			message.channel.send(embed)
		} else {
			await BanBot.findOneAndUpdate(
				{
					botid: `${bot}`
				},
				{
					upsert: true
				}
			)
			await Botinfo.findOneAndDelete(
				{
					botid: `${bot}`
				}
			)
			logEmbed.setTitle("A Bot was Banned")
			logEmbed.setColor("RED")
			logEmbed.setDescription("A new bot has been added to our ban list.")
			logEmbed.addField("Bot", `${bot}`, true)
			logEmbed.addField("Moderator", `<@${message.author.id}>`, true)
			logEmbed.addField("Reason", `${reason}`)
			logChannel.send(logEmbed)
			
			embed.setDescription(`Bot has been added. Ban ID: ${banID + 1}`)
			message.channel.send(embed)

			await message.guild.member(bot).ban(reason);
		}
	}
}