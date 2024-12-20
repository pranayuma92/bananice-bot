const TelegramBot = require("node-telegram-bot-api");
const { API_TOKEN } = require("./config/botConfig");

// Inisialisasi bot
const bot = new TelegramBot(API_TOKEN, { polling: true });

// Impor dan daftarkan semua perintah
require("./commands/start")(bot);
require("./commands/help")(bot);
require("./commands/menu")(bot);
require("./commands/echo")(bot);
require("./commands/addItem")(bot);
require("./commands/showItems")(bot);
require("./commands/dbDebug")(bot);

// Impor dan daftarkan semua handler
require("./handlers/messageHandler")(bot);
require("./handlers/callbackQueryHandler")(bot);

module.exports = bot;
