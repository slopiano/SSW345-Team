// Run dotenv
require('dotenv').config()
const axios = require('axios')

const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

const apiKey = process.env.CRYPTO_API

client.on('message', msg => {
  if (msg.content === 'ping') {
    msg.reply('pong')
  }
  let response = null
  new Promise(async (resolve, reject) => {
    try {
      response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
          'X-CMC_PRO_API_KEY': apiKey
        }
      })
    } catch (ex) {
      response = null
      // error
      console.log(ex)
      msg.reply(ex)
      reject(ex)
    }
    if (response) {
      // success
      const json = response.data
      const string = JSON.stringify(json)
      const data = JSON.parse(string)
      const price = getPrice(data)
      msg.reply(price)
      resolve(json)
    }
  })
})


let response = null
  new Promise(async (resolve, reject) => {
    try {
      response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest', {
        headers: {
          'X-CMC_PRO_API_KEY': apiKey
        }
      })
    } catch (ex) {
      response = null
      // error
      console.log(ex)
      msg.reply(ex)
      reject(ex)
    }
    if (response) {
      // success
      const json = response.data
      const string = JSON.stringify(json)
      const data = JSON.parse(string)
      const price = getPrice(data)
      msg.reply(price)
      resolve(json)
    }
})

function getPrice (json) {
  let data = json.data[0]
  let coin = data.symbol
  console.log(coin);
  return coin["name"]
}

client.login(process.env.BOT_TOKEN);
