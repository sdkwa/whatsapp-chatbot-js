const WhatsAppBot = require('@sdkwa/whatsapp-chatbot')

const bot = new WhatsAppBot({
    idInstance: process.env.ID_INSTANCE,
    apiTokenInstance: process.env.API_TOKEN_INSTANCE
})

bot.on('message', (ctx) => {
    ctx.reply('Hello world!')
})
bot.launch()