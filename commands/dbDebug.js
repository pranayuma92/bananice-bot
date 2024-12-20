const db = require("../config/dbConfig");

module.exports = (bot) => {
  bot.onText(/\/db get all(.*)/, (msg, match) => {
    const chatId = msg.chat.id;

    let param = match[1].trim();

        // Dapatkan tanggal hari ini

        const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
        if (param && !dateRegex.test(param)) {
            bot.sendMessage(chatId, "Format tanggal tidak valid. Gunakan format DD/MM/YYYY.");
            return;
        }

        // Query hanya untuk data dengan tanggal hari ini
        const query = param ? `
            SELECT id, name, price, quantity, (price * quantity) AS total, date_added
            FROM items
            WHERE date_added = ?
        ` : `
            SELECT id, name, price, quantity, (price * quantity) AS total, date_added
            FROM items
        `;

        const params = param ? [param] : [];

        db.all(query, params, (err, rows) => {
            if (err) {
                bot.sendMessage(chatId, "Gagal mengambil data barang.");
                console.error(err.message);
                return;
            }


            if (rows.length === 0) {
              const msg = param ? `Tidak ada barang yang diinput pada tanggal ${param}.` : 'Tidak ada data.';
              bot.sendMessage(chatId, msg);
            } else {
                let message = param ? `Daftar Barang (${param}):\n` : "Daftar Semua Barang:\n";
                let grandTotal = 0;

                rows.forEach((row) => {
                    console.log(row)
                    message += `Id: ${row.id}\n`;
                    message += `Tanggal: ${row.date_added}\nNama: ${row.name}\nHarga Satuan: Rp${row.price.toLocaleString()}\nJumlah: ${row.quantity}\nTotal: Rp${row.total.toLocaleString()}\n\n`;
                    grandTotal += row.total;
                });

                message += param ? `Total Keseluruhan: Rp${grandTotal.toLocaleString()}` : '';
                bot.sendMessage(chatId, message);
            }
        });
  });

  bot.onText(/\/db del (\d+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const itemId = parseInt(match[1], 10);

    const query = `
      DELETE FROM items WHERE id = ?
    `;

    db.run(query, [itemId], (err) => {
      if (err) {
          bot.sendMessage(chatId, "Gagal menghapus barang.");
          console.error(err.message);
      } else {
          bot.sendMessage(chatId, `item berhasil di hapus`);
      }
    })
  });
};