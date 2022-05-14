const mongoose = require('mongoose')

const banned_bot = new mongoose.Schema({
  botid: {
      type: String,
      required: true
  }
})

module.exports = mongoose.model('banned-bots', banned_bot);