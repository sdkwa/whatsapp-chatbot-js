const WhatsAppBot = require('../src/whatsappbot')

const bot = new WhatsAppBot({
    idInstance: process.env.ID_INSTANCE,
    apiTokenInstance: process.env.API_TOKEN_INSTANCE
})

bot.on('message', (ctx) => {
    ctx.reply(ctx.message.text)
})

//bot.launch()

bot.launch({webhook: {
  hookPath: "/webhook",
  port: 8001,
  host: 'localhost'
}})
