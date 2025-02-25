const fs = require('fs-extra');
const path = require("path");
const { Sequelize } = require('sequelize');

// Load environment variables if the .env file exists
if (fs.existsSync('set.env')) {
    require('dotenv').config({ path: __dirname + '/set.env' });
}

const databasePath = path.join(__dirname, './database.db');
const DATABASE_URL = process.env.DATABASE_URL === undefined ? databasePath : process.env.DATABASE_URL;

module.exports = {
    session: process.env.SESSION_ID || 'FLASH-MD-WA-BOT;;;=>eyJub2lzZUtleSI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiV095U1J0ZnhObWk2a0Y4STFFRWp3cEZQNEkrSWduZ2M0bjBnM0wwNWEzND0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiVnN3blFIMys4RGh2TTc3ckZ1SzgzUWU1QTRKazYyMWNQYnhtWUg0cHFRaz0ifX0sInBhaXJpbmdFcGhlbWVyYWxLZXlQYWlyIjp7InByaXZhdGUiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJVT0N0b3B5aEpMWWJFWVJiUnpVbWxqS0NnaEZhT1V3S0JublBSbUd5TzJNPSJ9LCJwdWJsaWMiOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJtdG01QVpPRnRqWVB5dmMyQmhKemk0UW1IeU9YWjNndHFnYTE0Y09KM2hNPSJ9fSwic2lnbmVkSWRlbnRpdHlLZXkiOnsicHJpdmF0ZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6Ik1LNGg5SzFyc0pvbXUrRTBCN0NzUUFqYnI3OCtYU0FaTTVTSkJlcnFYV0E9In0sInB1YmxpYyI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlVpR1NCS1N1YzN6NHFjOTVCMk9kRVhsUGFhaVplcHFFa0pYYU9yTnZyajg9In19LCJzaWduZWRQcmVLZXkiOnsia2V5UGFpciI6eyJwcml2YXRlIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiSUtuYzd6THVrZ0tYZ1Y3RHpvd3h1Rk5XM3lLMmRGNW9MYmU5dVVrM3Ewbz0ifSwicHVibGljIjp7InR5cGUiOiJCdWZmZXIiLCJkYXRhIjoiNzZYM3g4U0w1YmpPL091dk1sMmczVmlHdjgzOFlFbGk4bkt5Y01ka29tWT0ifX0sInNpZ25hdHVyZSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IlJ1Q1JoRW45Ti9pbWFkRzExQjFrUkcwcmZWMnlyNFRQVGZpOUNEZWZwR09uVTB0MXVManhaT212R0VjbXpXU3BpeENJY0g5RXcyUlBNNnVwclExdUR3PT0ifSwia2V5SWQiOjF9LCJyZWdpc3RyYXRpb25JZCI6MjI5LCJhZHZTZWNyZXRLZXkiOiJFREErN0QxZU1iRzRrVXUxSWZKNyt1TmxUNElJR1lFUlhBTW5ELytHcFAwPSIsInByb2Nlc3NlZEhpc3RvcnlNZXNzYWdlcyI6W3sia2V5Ijp7InJlbW90ZUppZCI6IjQwNzcxMDQ4MTg1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IkY3NjhCODJCRjBDQ0M1MjVBMkVBNzQ5MzIxQzI3QUFFIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDA1MTEzOTd9LHsia2V5Ijp7InJlbW90ZUppZCI6IjQwNzcxMDQ4MTg1QHMud2hhdHNhcHAubmV0IiwiZnJvbU1lIjp0cnVlLCJpZCI6IjYxMDNGNzdCRUQ0MkE5RDU1ODcwNkI1QkM5OUJBNTAzIn0sIm1lc3NhZ2VUaW1lc3RhbXAiOjE3NDA1MTEzOTd9XSwibmV4dFByZUtleUlkIjozMSwiZmlyc3RVbnVwbG9hZGVkUHJlS2V5SWQiOjMxLCJhY2NvdW50U3luY0NvdW50ZXIiOjEsImFjY291bnRTZXR0aW5ncyI6eyJ1bmFyY2hpdmVDaGF0cyI6ZmFsc2V9LCJkZXZpY2VJZCI6IklwNDl1UHVhU19Hcm9ZeWx1bDRQRHciLCJwaG9uZUlkIjoiNTA0ODhiY2ItMTY3OC00Mjc2LWFjYzUtNDMzMmQyNDUwZTUwIiwiaWRlbnRpdHlJZCI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6InJsNGI0QjkzZ1BISkZFcENObzA5eXFQQko2VT0ifSwicmVnaXN0ZXJlZCI6dHJ1ZSwiYmFja3VwVG9rZW4iOnsidHlwZSI6IkJ1ZmZlciIsImRhdGEiOiJaVjZpVzdBUHY5UzZ1bUNEWURxM2RHZ0hlblE9In0sInJlZ2lzdHJhdGlvbiI6e30sInBhaXJpbmdDb2RlIjoiNEpHRVlXTFAiLCJtZSI6eyJpZCI6IjQwNzcxMDQ4MTg1Ojc2QHMud2hhdHNhcHAubmV0IiwibmFtZSI6IuKYoO+4j/CdlYou8J2Vgi7ihJ0uMTEy4pqw77iPIn0sImFjY291bnQiOnsiZGV0YWlscyI6IkNKT1g4TkFHRUkreCtMMEdHQUlnQUNnQSIsImFjY291bnRTaWduYXR1cmVLZXkiOiJZRXVkQU5jWmxPUTJxSHpHL0tkVmdTK0NLR01VWXRJanJ4WDJpQU05b3hZPSIsImFjY291bnRTaWduYXR1cmUiOiJ5MUo1cFFtQXFzRjFUdlpEcU95YmViL2ZGUDhQOTJBbTlCWk1GcHNKbUJ4MThmU1BjbGtwR1d4bG5CalFDUFV5eGZvTWswRHhJSVcxcU13bUROaytDdz09IiwiZGV2aWNlU2lnbmF0dXJlIjoiTjFrQi9HN1MySFJlMUFoZE9RV1RaUDAraUxpTzVPZ2NQa0NxbWcwdUw2SlBnRXE1ZmY0YXZ1d2hqdXdraDVjRUxFSmNJZm9Qc2pDUWVDQ215NDN0QlE9PSJ9LCJzaWduYWxJZGVudGl0aWVzIjpbeyJpZGVudGlmaWVyIjp7Im5hbWUiOiI0MDc3MTA0ODE4NTo3NkBzLndoYXRzYXBwLm5ldCIsImRldmljZUlkIjowfSwiaWRlbnRpZmllcktleSI6eyJ0eXBlIjoiQnVmZmVyIiwiZGF0YSI6IkJXQkxuUURYR1pUa05xaDh4dnluVllFdmdpaGpGR0xTSTY4VjlvZ0RQYU1XIn19XSwicGxhdGZvcm0iOiJhbmRyb2lkIiwibGFzdEFjY291bnRTeW5jVGltZXN0YW1wIjoxNzQwNTExMzg4LCJteUFwcFN0YXRlS2V5SWQiOiJBQUFBQUdNVCJ9',
    PREFIXES: (process.env.PREFIX || '').split(',').map(prefix => prefix.trim()).filter(Boolean),
    OWNER_NAME: process.env.OWNER_NAME || "France King",
    OWNER_NUMBER: process.env.OWNER_NUMBER || "254105915061",
    AUTO_LIKE: process.env.STATUS_LIKE || "off",
    AUTO_READ_STATUS: process.env.AUTO_VIEW_STATUS || "on",
    AUTOREAD_MESSAGES: process.env.AUTO_READ_MESSAGES || "off",
    CHATBOT: process.env.CHAT_BOT || "off",
    AUTO_DOWNLOAD_STATUS: process.env.AUTO_SAVE_STATUS || 'off',
    A_REACT: process.env.AUTO_REACTION || 'on',
    L_S: process.env.STATUS_LIKE || 'on',
    AUTO_BLOCK: process.env.BLOCK_ALL || 'off',
    URL: process.env.MENU_LINKS || 'https://files.catbox.moe/c2jdkw.jpg',
    MODE: process.env.BOT_MODE || "public",
    PM_PERMIT: process.env.PM_PERMIT || 'on',
    HEROKU_APP_NAME: process.env.HEROKU_APP_NAME,
    ANTIVIEW: process.env.VIEWONCE,
    HEROKU_API_KEY: process.env.HEROKU_API_KEY,
    WARN_COUNT: process.env.WARN_COUNT || '3',
    PRESENCE: process.env.PRESENCE || '',
    ADM: process.env.ANTI_DELETE || 'on',
    TZ: process.env.TIME_ZONE || 'Africa/Nairobi',
    DP: process.env.STARTING_MESSAGE || "on",
    ANTICALL: process.env.ANTICALL || 'on',
    DATABASE_URL,
    DATABASE: DATABASE_URL === databasePath
        ? "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd"
        : "postgresql://flashmd_user:JlUe2Vs0UuBGh0sXz7rxONTeXSOra9XP@dpg-cqbd04tumphs73d2706g-a/flashmd",
    W_M: null, // Add this line
};

// Watch for changes in this file and reload it automatically
const fichier = require.resolve(__filename);
fs.watchFile(fichier, () => {
    fs.unwatchFile(fichier);
    console.log(`Updated ${__filename}`);
    delete require.cache[fichier];
    require(fichier);
});
