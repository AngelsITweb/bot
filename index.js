const to

// ЗАМЕНИТЬ НА ТОКЕН БОТА
const token = '7066498966:AAGe0PJTKhty_1S-8gy7016myjsIfYztT0Q'

const TelegramBot = require('node-telegram-bot-api')
const axios = require("axios");

// ЗАМЕНИТЬ ЭТУ УРЛУ НА УРЛУ БЭКА
const api_url = 'https://my-garage.site'
const bot = new TelegramBot(token, { polling: true })

async function checkUserExists(msg) {
    const res = await axios.post('https://my-garage.site/api/users/register', {
        telegramId: msg.from.id,
        username: msg.from.username,
        nickname: msg.from.first_name,
    }, {
        headers: {
            'registration-request': 'true',
        },
    });
    if (typeof res.data === 'string' && res.data.includes('уже')) {
        return true
    }
}


bot.on('message', async (msg) => {
    console.log('started')
    if (msg.text === '/start') {
        const chatId = msg.chat.id
        await bot.sendMessage(chatId, `Рады вас видеть, ${msg.from.first_name}! Проводится регистрация, пожалуйста подождите`)
        const userExists = await checkUserExists(msg);
        if (userExists) {
            await bot.sendMessage(chatId, 'Вы уже зарегистрированы!');
        } else {
            const res = await axios.post('http://my-garage.site/api/users/register', {
                telegramId: msg.from.id,
                username: msg.from.username,
                nickname: msg.from.first_name,
            }, {
                headers: {
                    'registration-request': 'true',
                },
            });
            await bot.sendMessage( chatId, 'Вы успешно зарегистрировались!');
        }
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
                            