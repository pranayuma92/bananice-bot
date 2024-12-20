module.exports = (bot) => {
    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, "Halo! Selamat datang di bot pencatatan penjualan Kulit Ayam Krispi.\nKetik /help untuk melihat perintah yang tersedia.");
    });
};
