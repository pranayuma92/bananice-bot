const db = require("../config/dbConfig");

module.exports = (bot) => {
    const itemName = "kulit ayam"; // Nama barang tetap
    const itemPrice = 15000; // Harga satuan tetap

    bot.onText(/\/tambah (\d+)/, (msg, match) => {
        const chatId = msg.chat.id;
        const quantity = parseInt(match[1], 10);

        if (isNaN(quantity) || quantity <= 0) {
            bot.sendMessage(chatId, "Jumlah barang harus berupa angka positif.");
            return;
        }

        // Dapatkan tanggal hari ini
        const today = new Date().toLocaleDateString("id-ID");

        // Masukkan data barang ke database
        const query = `
            INSERT INTO items (name, price, quantity, date_added)
            VALUES (?, ?, ?, ?)
        `;

        db.run(query, [itemName, itemPrice, quantity, today], (err) => {
            if (err) {
                bot.sendMessage(chatId, "Gagal menambahkan barang.");
                console.error(err.message);
            } else {
                const totalPrice = quantity * itemPrice;
                bot.sendMessage(chatId, `Berhasil menambahkan ${quantity} ${itemName} dengan total harga Rp${totalPrice.toLocaleString()} pada tanggal ${today}.`);
            }
        });
    });
};
