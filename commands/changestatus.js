module.exports = {
    name:'change-status',
    description: 'Ping command',

    async execute(client, message, args){

    //OWNER ONLY COMMAND
    if(message.author.id !== "705114789374066748") {
      return message.channel.send("This command can only be used by owner")
    }
    //ARGUMENT
    if(args.length <= 0) {
      return message.channel.send("Please give status message")
    }

    var type = args[0]
    var status = args.slice(1).join(" ")
    
     await client.user.setActivity(`${status}`, {
      type,
    });
   await message.channel.send("Updated the bot status")
}}