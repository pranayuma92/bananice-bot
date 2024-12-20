module.exports = (bot) => {
    bot.on("message", (msg) => {
        const chatId = msg.chat.id;
        const text = msg.text;

        if (!text.startsWith("/")) { // Jika pesan bukan perintah
            bot.sendMessage(chatId, `Anda berkata: ${text}`);
        }
    });
};
