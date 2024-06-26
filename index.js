const TelegramBot = require('node-telegram-bot-api');
const axios = require("axios");

const token = '7066498966:AAGe0PJTKhty_1S-8gy7016myjsIfYztT0Q';
const api_url = 'https://my-garage.site';
const bot = new TelegramBot(token, {polling: true});

function sleeper(ms) {
    return function (x) {
        return new Promise(resolve => setTimeout(() => resolve(x), ms));
    };
}

async function main() {
    await sleeper(15_000);
    console.log("Bot is started!!!");

    bot.on('message', async (msg) => {
        console.log('started');
        const chatId = msg.chat.id;

        if (msg.text === '/start') {
            try {
                await bot.sendMessage(chatId, `Рады вас видеть, ${msg.from.first_name}! Проводится регистрация, пожалуйста подождите`);
                const userExists = await checkUserExists(msg);
                if (userExists) {
                    await bot.sendMessage(chatId, 'Вы уже зарегистрированы!');
                } else {
                    const res = await axios.post(`${api_url}/api/users/register`, {
                        telegramId: msg.from.id,
                        username: msg.from.username,
                        nickname: msg.from.first_name,
                    }, {
                        headers: {
                            'registration-request': 'true',
                            "telegram-id": msg.from.id
                        },
                    });
                    await bot.sendMessage(chatId, 'Вы успешно зарегистрировались!');
                }
            } catch (error) {
                console.error(error);
                await bot.sendMessage(chatId, 'Произошла ошибка при регистрации. Пожалуйста, попробуйте позже.');
            }
        }

        if (msg.text === '/login') {
            await bot.sendMessage(chatId, 'Выберите роль', {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: 'Продавец',
                            web_app: {
                                url: 'https://mygarage-webapp.vercel.app/seller-panel'
                            }
                        }]
                    ]
                }
            });
        }

        if (msg.text === '/managerGSDvsdvafsf') {
            await bot.sendMessage(chatId, 'Выберите роль', {
                reply_markup: {
                    inline_keyboard: [
                        [{
                            text: 'Менеджер',
                            web_app: {
                                url: 'https://mygarage-webapp.vercel.app/manager-panel'
                            }
                        }]
                    ]
                }
            });
        }
    });
}

void main();

async function checkUserExists(msg) {
    try {
        const res = await axios.post(`${api_url}/api/users/register`, {
            telegramId: msg.from.id,
            username: msg.from.username,
            nickname: msg.from.first_name,
        }, {
            headers: {
                'registration-request': 'true',
            },
        });
        if (typeof res.data === 'string' && res.data.includes('уже')) {
            return true;
        }
        return false;
    } catch (error) {
        console.error(error);
        return false;
    }
}
