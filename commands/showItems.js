const db = require("../config/dbConfig");

module.exports = (bot) => {
    bot.onText(/\/cek(.*)/, (msg, match) => {
        const chatId = msg.chat.id;

        let param = match[1].trim();

        // Dapatkan tanggal hari ini
        const today = param || new Date().toLocaleDateString("id-ID");

        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (param && !dateRegex.test(param)) {
            bot.sendMessage(chatId, "Format tanggal tidak valid. Gunakan format DD/MM/YYYY.");
            return;
        }

        // Query hanya untuk data dengan tanggal hari ini
        const query = `
            SELECT name, price, quantity, (price * quantity) AS total, date_added
            FROM items
            WHERE date_added = ?
        `;

        db.all(query, [today], (err, rows) => {
            if (err) {
                bot.sendMessage(chatId, "Gagal mengambil data barang.");
                console.error(err.message);
                return;
            }

             console.log(today, new Date().toLocaleDateString("id-ID"))

            if (rows.length === 0) {
                bot.sendMessage(chatId, `Tidak ada barang yang diinput pada tanggal ${today}.`);
            } else {
                let message = `Daftar Barang (${today}):\n`;
                let grandTotal = 0;
                let qty = 0;
                message += `Nama: Kulit Ayam Krispi\n`;

                rows.forEach((row) => {
                    grandTotal += row.total;
                    qty += row.quantity
                });

                message += `Jumlah Terjual: ${qty}\n\n`;
                message += `Total Keseluruhan: Rp${grandTotal.toLocaleString()}`;
                console.log(today, new Date().toLocaleDateString("id-ID"))
                bot.sendMessage(chatId, message);
            }
        });
    });
};
