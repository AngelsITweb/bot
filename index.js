const token = '7045135748:AAF8RXjROq9mlRCeOyYmqA-0wKhznjIjoug'

const TelegramBot = require('node-telegram-bot-api')

const bot = new TelegramBot(token, { polling: true })

bot.on('message', async (msg) => {
    if (msg.text === '/start') {
        const chatId = msg.chat.id
        await bot.sendMessage(chatId, `hello ${msg.from.first_name}`)
    }
})

