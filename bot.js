const TelegramApi = require("node-telegram-bot-api")
var pm2 = require('pm2');

const token = "6552983930:AAFG1lpkmB3iNn9_77BqKr9-FFOKubF6Nr8";

const bot = new TelegramApi(token, { polling: true });

const { pairValue, pairValueT, pairValue2, pairValue2T, pairValue3, pairValue3T, searchText } = require('./test.js');
const { pairValueK, pairValueTK} = require('./reader.js');
const { url } = require("inspector");

const excelTAB = './excelTAB/sNBo22-nov.xlsx';
// const excelTABK = './excelTAB/failk.pdf';

var notes = [];
let startCommandHandled = false;

bot.onText(/Отправь в (.+)/, function (msg, match) {
	var userId = msg.from.id;
	var time = match[1];

	notes.push({ 'uid': userId, 'time': time});

	bot.sendMessage(userId, `Сегодня такие:\n\n${formattedPairs}`);
});


const currentDate = new Date();
const hours = currentDate.getHours().toString().padStart(2, '0');
const minutes = currentDate.getMinutes().toString().padStart(2, '0');
const seconds = currentDate.getSeconds().toString().padStart(2, '0');

const currentTime = `${hours}:${minutes}:${seconds}`;


bot.onText(/\/start/, (msg, match) => {
  const chatId = msg.chat.id;

  // Приветственный текст
  const welcomeText = 'Привет :3, это мой бот и он умеет: 1. присылать расписание по кнопкам';

  // Опции для кнопки
  const options = {
    reply_markup: {
      keyboard: [
        ['Меню'] // Добавляем кнопку "Меню"
      ],
      resize_keyboard: true,
      one_time_keyboard: true
    }
  };

  // Отправляем приветственный текст с кнопкой "Меню"
  bot.sendMessage(chatId, welcomeText, options);
});


pm2.connect(function(err) {
  if (err) throw err;

  setInterval(function() {
    console.log("Restarting app...");
    pm2.restart('app', function() {});
  }, 30000); 
});

setInterval(function(){
	for (var i = 0; i < notes.length; i++) {
    const curDate = new Date().getHours() + ':' + new Date().getMinutes();
    const formattedPairs = pairValue.join('\n'); // Форматирование каждого элемента массива на отдельной строке
    if (notes[i]['time'] === curDate) {
      bot.sendMessage(notes[i]['uid'],
      bot.sendMessage(chatId, `Сегодня такие:\n\n${formattedPairs}`)
      );
      notes.splice(i, 1);
    }
  }
}, 1000);


bot.on('message', async (msg) => {
  const text = msg.text;
  const chatId = msg.chat.id;

  bot.setMyCommands([
    { command: 'Меню', description: 'Старт меню' }
  ]);

  bot.onText(/сНБо22-1/,(msg) => {
    const chatId = msg.chat.id;
    if (!startCommandHandled) {
      bot.sendMessage(chatId, "Привет, начинай пользоваться :3", {
        "reply_markup": {
          "keyboard": [["Пары сегодня gr-1", "В след день gr-1"], ["Расписание"], ["Меню"]],
          resize_keyboard: true
        }
      });
      startCommandHandled = true;
    }
  });
  
  bot.onText(/сНБо22-2/,(msg) => {
    const chatId = msg.chat.id;
    if (!startCommandHandled) {
      bot.sendMessage(chatId, "Привет, начинай пользоваться :3", {
        "reply_markup": {
          "keyboard": [["Пары сегодня gr-2", "В след день gr-2"], ["Расписание"], ["Меню"]],
          resize_keyboard: true
        }
      });
      startCommandHandled = true;
    }
  });

  bot.onText(/сНБо22-3/,(msg) => {
    const chatId = msg.chat.id;
    if (!startCommandHandled) {
      bot.sendMessage(chatId, "Привет, начинай пользоваться :3", {
        "reply_markup": {
          "keyboard": [["Пары сегодня gr-3", "В след день gr-3"], ["Расписание"], ["Меню"]],
          resize_keyboard: true
        }
      });
      startCommandHandled = true;
    }
  });

  bot.onText(/сНБо22-К/,(msg) => {
    const chatId = msg.chat.id;
    if (!startCommandHandled) {
      bot.sendMessage(chatId, "Привет, начинай пользоваться :3", {
        "reply_markup": {
          "keyboard": [["Пары сегодня k", "В след день k"], ["Расписание K"], ["Меню"]],
          resize_keyboard: true
        }
      });
      startCommandHandled = true;
    }
  });

  bot.onText(/Меню/, (msg) => {
    const chatId = msg.chat.id;
    if (startCommandHandled) {
      bot.sendMessage(chatId, "Привет, выбери группу", {
        "reply_markup": {
          "keyboard": [["сНБо22-1","сНБо22-2", "сНБо22-3"], ["сНБо22-К"]],
          resize_keyboard: true
        }
      });
      startCommandHandled = false; // Сбрасываем флаг, чтобы команда "Настройки" снова стала доступной для вызова
    }
  });
  if (text === "Пары сегодня gr-1") {
    const formattedPairs = pairValue.join('\n');
    bot.sendMessage(chatId, `Сегодня "${searchText}" такие:\n\n${formattedPairs}`)
  }

  if (text === "В след день gr-1") {
    const formattedPairs = pairValueT.join('\n');
    bot.sendMessage(chatId, `В следующий раз такие\n\n${formattedPairs}`)
  }

  if (text === "Расписание") {
    bot.sendMessage(chatId, "Вот файлик :3");
    bot.sendDocument(chatId, excelTAB);
  }

  if (text === "Расписание K") {
    bot.sendMessage(chatId, "Вот файлик :3");
    bot.sendDocument(chatId, excelTABK);
  }    
  if (text === "Время") {
    bot.sendMessage(chatId, currentTime);
  }
  if (text === "Меню") {
    startCommandHandled = true; // Устанавливаем флаг, чтобы предотвратить повторное выполнение команды до следующего вызова команды
  }

  if (text === "Пары сегодня gr-2") {
    const formattedPairs = pairValue2.join('\n');
    bot.sendMessage(chatId, `Сегодня "${searchText}" такие:\n\n${formattedPairs}`)
  }

  if (text === "В след день gr-2") {
    const formattedPairs = pairValue2T.join('\n');
    bot.sendMessage(chatId, `В следующий раз такие:\n\n${formattedPairs}`)
  }

  if (text === "Пары сегодня gr-3") {
    const formattedPairs = pairValue3.join('\n');
    bot.sendMessage(chatId, `Сегодня "${searchText}" такие:\n\n${formattedPairs}`)
  }

  if (text === "В след день gr-3") {
    const formattedPairs = pairValue3T.join('\n');
    bot.sendMessage(chatId, `В следующий раз такие:\n\n${formattedPairs}`)
  }

  if (text === "Пары сегодня k") {
    const formattedPairs = pairValueK.join('\n');
    bot.sendMessage(chatId, `Сегодня "${searchText}" такие:\n\n${formattedPairs}`)
  }

  if (text === "В след день k") {
    const formattedPairs = pairValueTK.join('\n');
    bot.sendMessage(chatId, `В следующий раз такие\n\n${formattedPairs}`)
  }
});
