module.exports = (bot) => {
    bot.on("callback_query", (query) => {
        const chatId = query.message.chat.id;
        bot.sendMessage(chatId, `Anda memilih: ${query.data}`);
    });
};
