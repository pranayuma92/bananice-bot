module.exports = (bot) => {
    bot.onText(/\/menu/, (msg) => {
        const chatId = msg.chat.id;

        const options = {
            reply_markup: {
                inline_keyboard: [
                    [{ text: "Tombol 1", callback_data: "1" }],
                    [{ text: "Tombol 2", callback_data: "2" }],
                ],
            },
        };

        bot.sendMessage(chatId, "Pilih salah satu:", options);
    });
};
