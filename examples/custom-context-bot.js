import WhatsAppBot from '@sdkwa/whatsapp-chatbot'

class CustomContext extends WhatsAppBot.Context {
  constructor (update, telegram, options) {
    console.log('Creating context for %j', update)
    super(update, telegram, options)
  }

  reply (...args) {
    console.log('reply called with args: %j', args)
    return super.reply(...args)
  }
}

const bot = new WhatsAppBot({
  host: process.env.HOST,
  idInstance: process.env.ID_INSTANCE,
  apiTokenInstance: process.env.API_TOKEN_INSTANCE
}, { contextType: CustomContext })

bot.start((ctx) => ctx.reply('Hello'))
bot.on('message', (ctx) => {
    ctx.reply('Send "/start" to launch bot')
})
bot.launch()
