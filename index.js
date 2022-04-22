// Run dotenv
require('dotenv').config()
const axios = require('axios')

const { Client, Intents } = require('discord.js')
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] })

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`)
})

const apiKey = process.env.CRYPTO_API

// var idMap = {}
// let map_response = null
//   new Promise(async (resolve, reject) => {
//     try {
//       map_response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/map', {
//         headers: {
//           'X-CMC_PRO_API_KEY': apiKey
//         }
//       })
//     } catch (ex) {
//       response = null
//       // error
//       console.log(ex)
//       reject(ex)
//     }
//     if (response) {
//       // success
//       const json = response.data
//       const string = JSON.stringify(json)
//       const data = JSON.parse(string)
      
//       resolve(json)
//     }
// })

client.on('message', msg => {
  if(msg.content.length > 6){
  if (msg.content.slice(0,3) === 'get') {
    const cryptSymbol = msg.content.slice(4,7)
    let response = null
    new Promise(async (resolve, reject) => {
    try {
      response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest', {
        params: { symbol: cryptSymbol},
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
      console.log(msg.content.slice(0,3));
      console.log(msg.content.slice(4,7));
    }
    if (response) {
      // success
      const json = response.data
      const string = JSON.stringify(json)
      const data = JSON.parse(string)
      const price = getPrice(data, cryptSymbol)
      let priceString = price.toString();
      msg.reply(priceString)
      resolve(json)
    }
  })
  }
}
})


// let response = null
//   new Promise(async (resolve, reject) => {
//     try {
//       response = await axios.get('https://pro-api.coinmarketcap.com/v1/cryptocurrency/quotes/latest?symbol=BTC', {
//         headers: {
//           'X-CMC_PRO_API_KEY': apiKey
//         }
//       })
//     } catch (ex) {
//       response = null
//       // error
//       console.log(ex)
//       reject(ex)
//     }
//     if (response) {
//       // success
//       const json = response.data
//       const string = JSON.stringify(json)
//       const data = JSON.parse(string)
//       console.log(data);
//       resolve(json)
//     }
// })

function getPrice (json, cryptSymbol) {
  let data = json['data'][cryptSymbol]['quote']['USD']['price']
  console.log(data);
  return data
}

client.login(process.env.BOT_TOKEN);
