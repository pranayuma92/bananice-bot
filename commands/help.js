module.exports = (bot) => {
    bot.onText(/\/help/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, `
            Perintah yang tersedia:
            \n/tambah [jumlah item] - Menginput data item yang terjual
            \n/cek - Melihat data yang telah terinput pada hari ini
            \n/cek [dd/mm/yyyy] - Melihat data yang telah terinput pada tanggal tertentu
        `);
    });
};
