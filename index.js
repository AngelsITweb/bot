const token = '7187159461:AAH1EAia-I-T4qixQM7sfFme1VQB2xNJLfs'

const TelegramBot = require('node-telegram-bot-api')
const axios = require("axios");

const bot = new TelegramBot(token, { polling: true })


const backendDomain = process.env.DOMAIN

bot.on('message', async (msg) => {
    console.log('started')
    if (msg.text === '/start') {
    const chatId = msg.chat.id
    const telegramId = msg.from.id.toString()
    const username = msg.from.username || 'не указан'
    const nickname = msg.from.first_name || 'не указан'
    
    await bot.sendMessage(chatId, `Отправляю запрос на регистрацию.\nТелеграм ID: ${telegramId}\nUsername: ${username}\nNickname: ${nickname}`)
    
    try {
        const res = await axios.post('https://my-garage.site/api/users/register', { telegramId: telegramId, username: username, nickname: nickname }, {
            headers: {
                'telegram-id': telegramId
            }
        })
        console.log(res.statusText)
        await bot.sendMessage(chatId, `Регистрация прошла успешно ${res.data.username}`)
    } catch (error) {
        console.error('Ошибка регистрации:', error)
        await bot.sendMessage(chatId, `Произошла ошибка при регистрации: ${error.message}`)
    }
}
    if (msg.text === '/login') {
        await bot.sendMessage(msg.chat.id, 'Выберите роль', {
            reply_markup: {
                inline_keyboard: [
                    [{
                        text: 'Продавец',
                        web_app: {
                            url: 'mygarage-eight.vercel.app/seller-panel'
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
                                url: 'mygarage-eight.vercel.app/manager-panel'
                            }
                        }
                    ],
                ]
            }
        })
    }
})

