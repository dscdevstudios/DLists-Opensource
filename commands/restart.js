const wait = require("util").promisify(setTimeout);


module.exports = {
    name:'restart',
    description: 'Restart Bot & Website',

    async execute(client, message, args){

    //OWNER ONLY COMMAND
    if(message.author.id !== "705114789374066748") {
      return message.channel.send("This command can only be used by owner")
    }
    
    client.destroy()
    console.log('Client Destroyed')
    client.login(process.env.TOKEN);
    await message.channel.send('Restarted!')
    console.log('Client Rebooted')
}}