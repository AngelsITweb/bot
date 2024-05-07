const token = '7045135748:AAF8RXjROq9mlRCeOyYmqA-0wKhznjIjoug'

const TelegramBot = require('node-telegram-bot-api')
const axios = require("axios");

const bot = new TelegramBot(token, { polling: true })

bot.on('message', async (msg) => {
    console.log('started')
    if (msg.text === '/start') {
        const chatId = msg.chat.id
        await bot.sendMessage(chatId, `Рады вас видеть, ${msg.from.first_name}! Проводится регистрация, пожалуйста подождите`)
        const res = await axios.post('http://localhost:3000/api/users/register', { telegramId: msg.from.id.toString(), username: msg.from.username, nickname: msg.from.first_name })
        console.log(res.statusText)
        await bot.sendMessage(chatId, `Регистрация прошла успешно ${res.data.username}`)
    }
    if (msg.text === '/login') {
        await bot.sendMessage(msg.chat.id, 'Выберите роль', {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Продавец',
                        web_app: {
                            url: 'https://mygaragewebapp-ajgrj870z-siqqdevs-projects-2a9a6541.vercel.app/seller-panel'
                        }
                    }
                    ],
                ]
            }
        })
    }
    if (msg.text === '/managerGSDvsdvafsf') {
        await bot.sendMessage(msg.chat.id, 'Выберите роль', {
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: 'Менеджер',
                            web_app: {
                                url: 'https://mygaragewebapp-ajgrj870z-siqqdevs-projects-2a9a6541.vercel.app/manager-panel'
                            }
                        }
                    ],
                ]
            }
        })
    }
})

